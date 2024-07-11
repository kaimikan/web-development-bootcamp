/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

const questions = [
  {
    type: 'input',
    name: 'hobby',
    message: "What's one of your hobbies",
  },
];

inquirer
  .prompt(questions)
  .then((answers) => {
    // ChatGPT is very useful
    const hobby = answers.hobby;
    // Generate the QR code image as a PNG
    const qrImage = qr.image(hobby, { type: 'png' });
    // Create a write stream to save the QR code image
    const output = fs.createWriteStream('qrCode.png');
    // Pipe the generated QR code image to the write stream
    qrImage.pipe(output);

    fs.writeFile('hobby.txt', 'One of your hobbies: ' + hobby, (err) => {
      if (err) throw err;
      console.log('File saved!');
    });

    output.on('finish', () => {
      console.log('successfully create qr code and saved it as qrcode.png');
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(
        "Prompt couldn't be rendered in the current environment: " +
          error.message
      );
    } else {
      console.log('Something else went wrong: ' + error.message);
    }
  });
