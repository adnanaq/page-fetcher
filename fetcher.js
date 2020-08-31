const request = require('request');
const fs = require('fs');
const readline = require('readline');

const args = process.argv.slice(2);
const url = args[0];
const filetoSave = args[1];

const rLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(url, (error, response, body) => {

  if (error) {
    console.log("URL does not exist!");
    rLine.close();
  } else {
    if (fs.existsSync(filetoSave)) {
      rLine.question('File already exists!! Enter "y" to continue overwriting or enter"q" to quit the process: ', (answer) => {
        if (answer.toLowerCase() === 'y') {
          console.log('Overwriting the existing file')
          fs.writeFile(filetoSave, body, (err) => {
            if (err) {
              console.log("Error creating file.");
              rLine.close();
            }
            console.log(`Downloaded and saved ${fs.statSync(filetoSave).size} bytes to ${filetoSave}`);
            rLine.close();
          });
        } else if (answer.toLowerCase() === 'q') {
          console.log("Exited the process!");
          rLine.close();
        }
      });

    } else {
      fs.writeFile(filetoSave, body, (err) => {
        if (err) {
          console.log("Error creating file.");
          rLine.close();
        } else {
          console.log(`Downloaded and saved ${fs.statSync(filetoSave).size} bytes to ${filetoSave}`);
          rLine.close();
        }
      });
    }
  }
});