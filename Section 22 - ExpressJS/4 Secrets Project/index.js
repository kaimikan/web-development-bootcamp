//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from 'express';
// body parser is a incorporated as a part of
// express, so you can call for example:
// app.use(express.urlencoded({ extended: true }));
// but with the import it is clearer
import bodyParser from 'body-parser';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const SECRET_PASSWORD = 'secret123';
var isUserAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));

function passCheck(req, res, next) {
  console.log(req.body);
  // const password = req.body['password'];
  const password = req.body.password;
  if (password == SECRET_PASSWORD) isUserAuthorised = true;
  next();
}

app.use(passCheck);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/check', (req, res) => {
  // var password = req.body.password;
  // doing it with middleware instead
  if (isUserAuthorised) {
    res.sendFile(__dirname + '/public/secret.html');
  } else {
    res.sendFile(__dirname + '/public/index.html');
    console.log('incorrect password');
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
