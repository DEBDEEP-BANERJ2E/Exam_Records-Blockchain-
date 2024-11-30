const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');

// Path to the examRecords.json file
const examRecordsPath = path.join(__dirname, './scripts/data/examRecords.json');

// Initialize the watcher
const watcher = chokidar.watch(examRecordsPath, {
  persistent: true, // Keep the watcher running
  ignoreInitial: true, // Ignore initial add events
  awaitWriteFinish: true // Wait for file write to finish
});

// Watch for changes and trigger the execution of addRecord.js
watcher.on('change', (event, path) => {
  console.log(`Detected change in: ${path}`);
  console.log("Running 'truffle exec scripts/addRecord.js'...");

  // Run the Truffle exec command to add record
  exec('truffle exec scripts/addRecord.js --network development', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing command: ${err}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});

console.log(`Watching for changes in: ${examRecordsPath}`);
