// METROPOLITAN MUSEUM OF ART COLLECTION API
import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
const API_URL_BASE = 'https://collectionapi.metmuseum.org/public/collection/';
let objectIDsArray, totalObjects;

app.use(express.static('public'));

export const delay = (ms, defaultResolve = null) =>
  new Promise((resolve) => setTimeout(() => resolve(defaultResolve), ms));

// middleware function
// only called once on program load to fetch all the possible object IDs
async function getObjectIDs(req, res, next) {
  try {
    const fetchObjects = await axios.get(`${API_URL_BASE}/v1/objects`);
    objectIDsArray = fetchObjects.data.objectIDs;
    totalObjects = objectIDsArray.length;
    console.log('Total objects: ', totalObjects);

    // debugger command makes a breakpoint for the program in which u can see the state of variables up to that point
    debugger;
    // can also be checked with devtools in browser
    // nodemon --inspect index.js adds a debbug server
  } catch (error) {
    console.error(error.message);
    res.render('index.ejs', { error: error.message });
  }
  next();
}

app.use(getObjectIDs);

app.get('/', async (req, res) => {
  try {
    const randomObjectID =
      objectIDsArray[Math.floor(Math.random() * totalObjects)];
    // notice {} notation, this makes the object describe itself -> { randomObjectID: 261520 }
    console.log({ randomObjectID });

    const fetchObject = await axios.get(
      `${API_URL_BASE}/v1/objects/${randomObjectID}`
    );

    console.log(fetchObject.data);
    const data = fetchObject.data;

    const artObject = {
      title: data.title,
      image: data.primaryImageSmall,
      department: data.department,
      artistName: data.artistDisplayName,
      artistBio: data.artistDisplayBio,
      date: data.objectDate,
      siteURL: data.objectURL,
    };

    console.log({ artObject });

    res.render('index.ejs', { art: artObject });
  } catch (error) {
    console.error(error.message);
    res.render('index.ejs', { error: error.message });
  }
});

// use this page to test design without needing to make api calls every reload
app.get('/static-test', (req, res) => {
  const artObject = {
    title:
      'Florence Brandon, from the Actresses series (N245) issued by Kinney Brothers to promote Sweet Caporal Cigarettes',
    image: '',
    department: 'Drawings and Prints',
    artistName: 'Kinney Brothers Tobacco Company',
    artistBio: '',
    date: '1890',
    siteURL: 'https://www.metmuseum.org/art/collection/search/652240',
  };
  console.log({ artObject });
  res.render('index.ejs', { art: artObject });
});

app.listen(port, () => {
  console.log('Server running on port: ', port);
});
