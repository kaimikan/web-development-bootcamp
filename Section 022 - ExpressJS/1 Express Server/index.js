// npm init -y -> creates a package.json without prompts (you need to have an index.js already created)

// to check with ports are used/open:
// netstat -ano | findstr "LISTENING"

// http - Hyper Text Transfer Protocol (how to speak with servers)
// REQUESTS -> GET, POST, PUT (update but replace), PATCH (update but dont replace), DELETE
// RESPONSES -> https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
// Informational responses (100 – 199) -> Hold on
// Successful responses (200 – 299) -> Here you go
// Redirection messages (300 – 399) -> Go away
// Client error responses (400 – 499) -> You fucked up (or maybe 418)
// Server error responses (500 – 599) -> I fucked up

// nodemon - a package that automatically refreshes server when changes have been made
// npm i -g nodemon - install package globally so it can be used for all projects

import express from 'express';
const app = express();
const port = 3000;

// if this doesn't exist, localhost:3000 returns "Cannot GET /"
app.get('/', (req, res) => {
  console.log(req.rawHeaders);
  res.send('<h1>Testing</h1>');
});

app.get('/about', (req, res) => {
  res.send('<h1>About Page</h1>');
});

app.get('/contact', (req, res) => {
  res.send('<h1>Contact Page</h1><p>phone number: 123</p>');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
