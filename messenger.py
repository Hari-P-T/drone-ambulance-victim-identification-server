# import serial
# import time

# # Configure the serial port
# ser = serial.Serial('/dev/serial0', baudrate=9600, timeout=1)

# def send_sms(phone_number, message):
#     try:
#         # Ensure the module is in text mode
#         ser.write(b'AT+CMGF=1\r')
#         time.sleep(1)
#         response = ser.read(100)
#         print(response.decode())

#         # Set the recipient's phone number
#         ser.write(f'AT+CMGS="{phone_number}"\r'.encode())
#         time.sleep(1)
#         response = ser.read(100)
#         print(response.decode())

#         # Send the SMS message
#         ser.write(f'{message}\r'.encode())
#         time.sleep(1)
        
#         # Send Ctrl+Z to indicate the end of the message
#         ser.write(bytes([26]))
#         time.sleep(3)
#         response = ser.read(100)
#         print(response.decode())

#     except Exception as e:
#         print(f"Error: {e}")

# if _name_ == "_main_":
#     phone_number = "9025313939"
#     message = "Hello, this is a test SMS from Raspberry Pi!"
#     send_sms(phone_number, message)


print("success ra parama")