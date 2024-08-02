import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
const API_URL = 'https://secrets-api.appbrewery.com/';

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = 'totallyrandomrname123';
const yourPassword = 'totallyrandomname1234';
const yourAPIKey = '0229266c-2667-4e77-8cbb-4971d41834d0';
const yourBearerToken = '06872926-e65c-4a7b-92c4-b84f3145b6e3';

app.get('/', (req, res) => {
  res.render('index.ejs', { content: 'API Response.' });
});

app.get('/noAuth', async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try {
    const response = await axios.get(
      'https://secrets-api.appbrewery.com/random'
    );
    const result = response.data.secret;
    console.log(result);
    res.render('index.ejs', { content: result });
  } catch (error) {
    console.error('Error: ', error.message);
  }
});

app.get('/basicAuth', async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */

  try {
    const response = await axios.get(
      'https://secrets-api.appbrewery.com/all?=page=2',
      {
        auth: {
          username: yourUsername,
          password: yourPassword,
        },
      }
    );

    let secretList = [];
    // let secretsString = '';
    response.data.forEach((secretObj) => {
      secretList.push(secretObj.secret);
      // secretsString.concat(secretsString, secretObj.secret + '\n');
    });

    const result = secretList;
    // const result = secretsString;
    console.log(result);

    res.render('index.ejs', { content: result });
  } catch (error) {
    console.error('Error: ', error.message);
  }
});

app.get('/apiKey', async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  let score = 5;
  try {
    const response = await axios.get(
      `https://secrets-api.appbrewery.com/filter?score=${score}&apiKey=${yourAPIKey}`
    );

    let secretList = [];
    // let secretsString = '';
    response.data.forEach((secretObj) => {
      secretList.push(secretObj.secret);
      // secretsString.concat(secretsString, secretObj.secret + '\n');
    });

    const result = secretList;
    // const result = secretsString;
    console.log(result);

    res.render('index.ejs', { content: result });
  } catch (error) {
    console.error('Error: ', error.message);
  }
});

app.get('/bearerToken', async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  let secretID = 42;
  try {
    const response = await axios.get(
      `https://secrets-api.appbrewery.com/secrets/${secretID}`,
      {
        headers: {
          Authorization: `Bearer ${yourBearerToken}`,
        },
      }
    );
    console.log('BEARER: ', response);
    const result = response.data.secret;
    console.log(result);
    res.render('index.ejs', { content: result });
  } catch (error) {
    console.error('Error: ', error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
