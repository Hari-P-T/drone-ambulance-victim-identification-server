// const chokidar = require('chokidar');
// const { exec } = require('child_process');
// const path = require('path');

// // Define folder paths
// const folderToWatch = path.resolve(__dirname, 'FOLDER'); // Absolute path for the folder to watch for new images
// const enhancedFolder = path.resolve(__dirname, 'ENHANCED'); // Absolute path for the enhanced folder

// // Global variable to store the latest file name
// let fileName = '';

// // Function to execute the first command (for FOLDER changes)
// const executeFirstCommand = () => {
//   const cmd = `wine realesrgan-ncnn-vulkan.exe -i "${folderToWatch}\\${fileName}.png" -o "${enhancedFolder}\\${fileName}.png" -s 4 -n realesrgan-x4plus -f -x png`;
//   console.log("---execution of first command is in progress---");
//   exec(cmd, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error executing first command: ${cmd}`, error);
//       return;
//     }
//     console.log(`Output for first command:\n${stdout}`);
//   });
// };

// // Function to execute the second command (for ENHANCED changes)
// const executeSecondCommand = () => {
//   const cmd = `python3 predict.py ${fileName}.png`;
//   console.log("---execution of second command is in progress---");
//   exec(cmd, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error executing second command: ${cmd}`, error);
//       return;
//     }
//     console.log(`Output for second command:\n${stdout}`);
//   });
// };

// // Watch for changes in the FOLDER directory
// const folderWatcher = chokidar.watch(folderToWatch, {
//   ignored: /(^|[\/\\])\../, // ignore dotfiles
//   persistent: true,
// });

// folderWatcher.on('add', (path) => {
//   console.log(`File ${path} has been added in FOLDER`);
//   fileName = path.substring(folderToWatch.length + 1, path.lastIndexOf('.')); // Store the new file name without extension
//   executeFirstCommand();
// });

// // Watch for changes in the ENHANCED directory
// const enhancedWatcher = chokidar.watch(enhancedFolder, {
//   ignored: /(^|[\/\\])\../, // ignore dotfiles
//   persistent: true,
// });

// enhancedWatcher.on('add', (path) => {
//   console.log(`File ${path} has been added in ENHANCED`);
//   fileName = path.substring(enhancedFolder.length + 1, path.lastIndexOf('.')); // Store the new file name without extension
//   executeSecondCommand();
// });

// console.log(`Monitoring changes in folders:\n- ${folderToWatch}\n- ${enhancedFolder}`);

const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');

// Define folder paths
const folderToWatch = path.resolve(__dirname, 'FOLDER'); // Absolute path for the folder to watch for new images
const enhancedFolder = path.resolve(__dirname, 'ENHANCED'); // Absolute path for the enhanced folder

// Global variable to store the latest file name
let fileName = '';

// Function to execute the first command (for FOLDER changes)
const executeFirstCommand = () => {
  const cmd = `wine realesrgan-ncnn-vulkan.exe -i "${folderToWatch}\\${fileName}.png" -o "${enhancedFolder}\\${fileName}.png" -s 4 -n realesrgan-x4plus -f -x png`;
  console.log("---execution of first command is in progress---");
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing first command: ${cmd}`, error);
      return;
    }
    console.log(`Output for first command:\n${stdout}`);
  });
};

// Function to execute the second command (for ENHANCED changes)
const executeSecondCommand = () => {
  const cmd = `python3 predict.py ${fileName}.png`;
  console.log("---execution of second command is in progress---");
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing second command: ${cmd}`, error);
      return;
    }
    console.log(`Output for second command:\n${stdout}`);
  });
  const eraser = `rm  ./FOLDER/${fileName}.png`;
  exec(eraser, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing first eraser command:`, error);
      return;
    }
    console.log(`erased input img`);
  });
};

// Watch for changes in the FOLDER directory
const folderWatcher = chokidar.watch(folderToWatch, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
});

folderWatcher.on('add', (path) => {
  console.log(`File ${path} has been added in FOLDER`);
  fileName = path.substring(folderToWatch.length + 1, path.lastIndexOf('.')); // Store the new file name without extension
  executeFirstCommand();
});

// Watch for changes in the ENHANCED directory
const enhancedWatcher = chokidar.watch(enhancedFolder, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
});

enhancedWatcher.on('add', (path) => {
  console.log(`File ${path} has been added in ENHANCED`);
  fileName = path.substring(enhancedFolder.length + 1, path.lastIndexOf('.')); // Store the new file name without extension

  // Delay the execution of the second command by 1 second
  setTimeout(() => {
    executeSecondCommand();
  }, 10000); // 1000 milliseconds = 1 second
});

console.log(`Monitoring changes in folders:\n- ${folderToWatch}\n- ${enhancedFolder}`);
