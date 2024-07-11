// you can run node by just typing -> node
// then type -> .help

// run by typing -> node index.js
console.log('Yo, this is from Node.js!');

// file system module
// https://nodejs.org/docs/latest-v18.x/api/fs.html
const fs = require('fs');

// fs.writeFile('message.txt', 'Yo from an external file!', (err) => {
//   if (err) throw err;
//   console.log('File saved!');
// });

fs.readFile('message.txt', (encoding = 'utf8'), (err, data) => {
  if (err) throw err;
  console.log('This is the data from the file -> ' + data);
});
