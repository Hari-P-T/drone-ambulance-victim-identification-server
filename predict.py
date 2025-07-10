#-------------------------------------------------------------------------------------------------------------------------------
import os
import sys
from ultralytics import YOLO
import cv2
import runpy

# Check if the user provided a filename as a command-line argument
if len(sys.argv) < 2:
    print("Usage: python predict.py <filename>")
    sys.exit(1)

# Get the filename from the command-line argument
filename = sys.argv[1]

# Define the image path
IMAGES_DIR = os.path.join('.', 'ENHANCED')  # Adjust the path if needed
image_path = os.path.join(IMAGES_DIR, filename)
output_path = os.path.join('.', 'PREDICTS', f'{os.path.splitext(filename)[0]}.png')

# Ensure the output directory exists
os.makedirs(os.path.dirname(output_path), exist_ok=True)

# Load the YOLO model
model_path = 'yolo11n.pt'  # Replace with your model path
model = YOLO(model_path)  # Load a custom model

threshold = 0.5  # Confidence threshold for predictions

# Load the image
image = cv2.imread(image_path)
if image is None:
    print(f"Error: Image '{filename}' not found in '{IMAGES_DIR}'")
    sys.exit(1)

H, W, _ = image.shape

# Run model prediction on the image
results = model(image)[0]

flag=False
# Draw bounding boxes on the image
for result in results.boxes.data.tolist():
    print(result)
    x1, y1, x2, y2, score, class_id = result
    class_name = results.names[int(class_id)]
    if class_name in ['person', 'dog', 'cat'] and score > threshold:
        print("in")
        flag=True
        # Draw a rectangle for detected object
        cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 4)

        # Put the class name on the image
        cv2.putText(image, results.names[int(class_id)].upper(), (int(x1), int(y1 - 10)),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 255, 0), 3, cv2.LINE_AA)
        print(f'Class: {class_name} in {filename}')

# Save the image with predictions
if flag:
    print("in")
    cv2.imwrite(output_path, image)
    print(f'Saved: {output_path}')

    # Optionally display the image
    # cv2.imshow('Predictions', image)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    messenger = runpy.run_path('messenger.py')
    # print(messenger)
