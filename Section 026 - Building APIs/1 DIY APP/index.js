import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const masterKey = '123123'; //'4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT';

// we need the bodyParser json to help with the add.test.js request since otherwise the body is undefined
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//1. GET a random joke
app.get('/random', (req, res) => {
  let jokeIndex = Math.floor(Math.random() * jokes.length);
  let joke = jokes[jokeIndex];
  console.log({ joke });
  res.json({ joke });
});

//2. GET a specific joke
app.get('/jokes/:id', (req, res) => {
  // body and params are too different ways of passing data
  // body is done like config, params are passed through the url
  const jokeID = parseInt(req.params.id);
  // === is safer to compare with but it means we also need to parseInt for the jokeID
  const foundJoke = jokes.find((joke) => joke.id === jokeID);
  res.json({ foundJoke });
});

function filterData(array, query) {
  return array.filter((item) => {
    return Object.keys(query).every((key) => {
      // need to parse to int if we are filtering by ids
      if (key === 'id') {
        return item[key] === Number(query[key], 10);
      }
      return item[key] === query[key];
    });
  });
}

//3. GET a jokes by filtering on the joke type
app.get('/filter', (req, res) => {
  console.log('TEST: ', req.query.id, req.query);

  const typeFilteredJokes = jokes.filter(
    (joke) => req.query.jokeType === joke.jokeType
  );

  console.log('QUERY:', req.query);

  const superFilteredJokes = filterData(jokes, req.query);

  console.log('Filter result: ', superFilteredJokes);

  res.json({ superFilteredJokes });
});

//4. POST a new joke
app.post('/jokes', (req, res) => {
  const text = req.body.jokeText;
  const type = req.body.jokeType;
  const newJoke = {
    id: jokes.length + 1,
    jokeText: text,
    jokeType: type,
  };

  jokes.push(newJoke);

  console.log('new joke: ', newJoke);

  res.json(newJoke);
});

//5. PUT a joke
app.put('/jokes/:id', (req, res) => {
  const jokeID = Number(req.params.id, 10);
  let jokeToEdit = {};

  // there is a findIndex method as well, check solution.js for example
  jokeToEdit = jokes.find((joke) => Number(joke.id, 10) === jokeID);

  // here we check if any match was found
  // in retrospect should be done in some other calls as well but will leave it as is
  if (Object.keys(jokeToEdit).length !== 0) {
    jokeToEdit.jokeText = req.body.jokeText;
    jokeToEdit.jokeType = req.body.jokeType;

    jokes[Number(jokeToEdit.id, 10) - 1] = jokeToEdit;

    res.json(jokes[Number(jokeToEdit.id, 10) - 1]);
  } else {
    res.json({ err: 'No element with that id' });
  }
});

//6. PATCH a joke
app.patch('/jokes/:id', (req, res) => {
  const jokeID = Number(req.params.id, 10);

  const jokeIndex = jokes.findIndex((joke) => Number(joke.id, 10) === jokeID);

  // what the findIndex method returns if no matches were found
  const NO_MATCH_ID_RETURN = -1;
  if (jokeIndex != NO_MATCH_ID_RETURN) {
    const text = req.body.jokeText;
    const type = req.body.jokeType;
    // different way of doing it in solution.js
    if (text !== undefined) jokes[jokeIndex].jokeText = text;
    if (type !== undefined) jokes[jokeIndex].jokeType = type;

    // notice the shorthand if statements -> (condition) ? do if true : do if false
    // jokes[jokeIndex] = {
    //   id: jokes[jokeIndex].id,
    //   jokeText: text === undefined ? jokes[jokeIndex].jokeText : text,
    //   jokeType: type === undefined ? jokes[jokeIndex].jokeType : type,
    // };

    res.json(jokes[jokeIndex]);
  } else {
    res.json({ err: 'No element with that id' });
  }
});

//7. DELETE Specific joke
app.delete('/joke/:id', (req, res) => {
  const jokeID = Number(req.params.id, 10);

  const jokeIndex = jokes.findIndex((joke) => Number(joke.id, 10) === jokeID);

  const NO_MATCH_ID_RETURN = -1;
  if (jokeIndex != NO_MATCH_ID_RETURN) {
    jokes.splice(jokeIndex, 1);

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

//8. DELETE All jokes
app.delete('/jokes/all', (req, res) => {
  // had to change single joke delete path from /jokes/:id to /joke/:id cause it was not letting us access this endpoint, another way
  // to do it would be to keep the original names, but swap their places
  /* If you implement your handler for /jokes/:id above 
  /jokes/new, the route for https://localhost:3000/jokes/new will NOT reach its designated handler. */
  console.log(req.query.key);
  const userKey = req.query.key;
  const isUserAuthorised = userKey === masterKey;

  console.log(isUserAuthorised);
  if (isUserAuthorised) {
    jokes = [];

    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});

var jokes = [
  {
    id: 1,
    jokeText:
      "Why don't scientists trust atoms? Because they make up everything.",
    jokeType: 'Science',
  },
  {
    id: 2,
    jokeText:
      'Why did the scarecrow win an award? Because he was outstanding in his field.',
    jokeType: 'Puns',
  },
  {
    id: 3,
    jokeText:
      'I told my wife she was drawing her eyebrows too high. She looked surprised.',
    jokeType: 'Puns',
  },
  {
    id: 4,
    jokeText:
      'What did one ocean say to the other ocean? Nothing, they just waved.',
    jokeType: 'Wordplay',
  },
  {
    id: 5,
    jokeText:
      'Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.',
    jokeType: 'Wordplay',
  },
  {
    id: 6,
    jokeText: 'How do you organize a space party? You planet!',
    jokeType: 'Science',
  },
  {
    id: 7,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: 'Puns',
  },
  {
    id: 8,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: 'Math',
  },
  {
    id: 9,
    jokeText: 'What do you call fake spaghetti? An impasta!',
    jokeType: 'Food',
  },
  {
    id: 10,
    jokeText: 'Why did the tomato turn red? Because it saw the salad dressing!',
    jokeType: 'Food',
  },
  {
    id: 11,
    jokeText:
      'What do you get when you cross a snowman and a vampire? Frostbite!',
    jokeType: 'Wordplay',
  },
  {
    id: 12,
    jokeText:
      'Why did the golfer bring two pairs of pants? In case he got a hole in one!',
    jokeType: 'Sports',
  },
  {
    id: 13,
    jokeText:
      'Why are ghosts bad at lying? Because you can see right through them!',
    jokeType: 'Wordplay',
  },
  {
    id: 14,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: 'Movies',
  },
  {
    id: 15,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: 'Science',
  },
  {
    id: 16,
    jokeText:
      'I told my wife she was drawing her eyebrows too high. She looked surprised.',
    jokeType: 'Puns',
  },
  {
    id: 17,
    jokeText:
      'What did one ocean say to the other ocean? Nothing, they just waved.',
    jokeType: 'Wordplay',
  },
  {
    id: 18,
    jokeText:
      'Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.',
    jokeType: 'Wordplay',
  },
  {
    id: 19,
    jokeText: 'How do you organize a space party? You planet!',
    jokeType: 'Science',
  },
  {
    id: 20,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: 'Puns',
  },
  {
    id: 21,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: 'Math',
  },
  {
    id: 22,
    jokeText: 'What do you call fake spaghetti? An impasta!',
    jokeType: 'Food',
  },
  {
    id: 23,
    jokeText: 'Why did the tomato turn red? Because it saw the salad dressing!',
    jokeType: 'Food',
  },
  {
    id: 24,
    jokeText:
      'What do you get when you cross a snowman and a vampire? Frostbite!',
    jokeType: 'Wordplay',
  },
  {
    id: 25,
    jokeText:
      'Why did the golfer bring two pairs of pants? In case he got a hole in one!',
    jokeType: 'Sports',
  },
  {
    id: 26,
    jokeText:
      'Why are ghosts bad at lying? Because you can see right through them!',
    jokeType: 'Wordplay',
  },
  {
    id: 27,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: 'Movies',
  },
  {
    id: 28,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: 'Science',
  },
  {
    id: 29,
    jokeText:
      'I told my wife she was drawing her eyebrows too high. She looked surprised.',
    jokeType: 'Puns',
  },
  {
    id: 30,
    jokeText:
      'What did one ocean say to the other ocean? Nothing, they just waved.',
    jokeType: 'Wordplay',
  },
  {
    id: 31,
    jokeText:
      'Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.',
    jokeType: 'Wordplay',
  },
  {
    id: 32,
    jokeText: 'How do you organize a space party? You planet!',
    jokeType: 'Science',
  },
  {
    id: 33,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: 'Puns',
  },
  {
    id: 34,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: 'Math',
  },
  {
    id: 35,
    jokeText: 'What do you call fake spaghetti? An impasta!',
    jokeType: 'Food',
  },
  {
    id: 36,
    jokeText: 'Why did the tomato turn red? Because it saw the salad dressing!',
    jokeType: 'Food',
  },
  {
    id: 37,
    jokeText:
      'What do you get when you cross a snowman and a vampire? Frostbite!',
    jokeType: 'Wordplay',
  },
  {
    id: 38,
    jokeText:
      'Why did the golfer bring two pairs of pants? In case he got a hole in one!',
    jokeType: 'Sports',
  },
  {
    id: 39,
    jokeText:
      'Why are ghosts bad at lying? Because you can see right through them!',
    jokeType: 'Wordplay',
  },
  {
    id: 40,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: 'Movies',
  },
  {
    id: 41,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: 'Science',
  },
  {
    id: 42,
    jokeText:
      'I told my wife she was drawing her eyebrows too high. She looked surprised.',
    jokeType: 'Puns',
  },
  {
    id: 43,
    jokeText:
      'What did one ocean say to the other ocean? Nothing, they just waved.',
    jokeType: 'Wordplay',
  },
  {
    id: 44,
    jokeText:
      'Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.',
    jokeType: 'Wordplay',
  },
  {
    id: 45,
    jokeText: 'How do you organize a space party? You planet!',
    jokeType: 'Science',
  },
  {
    id: 46,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: 'Puns',
  },
  {
    id: 47,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: 'Math',
  },
  {
    id: 48,
    jokeText: 'What do you call fake spaghetti? An impasta!',
    jokeType: 'Food',
  },
  {
    id: 49,
    jokeText: 'Why did the tomato turn red? Because it saw the salad dressing!',
    jokeType: 'Food',
  },
  {
    id: 50,
    jokeText:
      'What do you get when you cross a snowman and a vampire? Frostbite!',
    jokeType: 'Wordplay',
  },
  {
    id: 51,
    jokeText:
      'Why did the golfer bring two pairs of pants? In case he got a hole in one!',
    jokeType: 'Sports',
  },
  {
    id: 52,
    jokeText:
      'Why are ghosts bad at lying? Because you can see right through them!',
    jokeType: 'Wordplay',
  },
  {
    id: 53,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: 'Movies',
  },
  {
    id: 54,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: 'Science',
  },
  {
    id: 55,
    jokeText:
      'I told my wife she was drawing her eyebrows too high. She looked surprised.',
    jokeType: 'Puns',
  },
  {
    id: 56,
    jokeText:
      'What did one ocean say to the other ocean? Nothing, they just waved.',
    jokeType: 'Wordplay',
  },
  {
    id: 57,
    jokeText:
      'Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.',
    jokeType: 'Wordplay',
  },
  {
    id: 58,
    jokeText: 'How do you organize a space party? You planet!',
    jokeType: 'Science',
  },
  {
    id: 59,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: 'Puns',
  },
  {
    id: 60,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: 'Math',
  },
  {
    id: 61,
    jokeText: 'What do you call fake spaghetti? An impasta!',
    jokeType: 'Food',
  },
  {
    id: 62,
    jokeText: 'Why did the tomato turn red? Because it saw the salad dressing!',
    jokeType: 'Food',
  },
  {
    id: 63,
    jokeText:
      'What do you get when you cross a snowman and a vampire? Frostbite!',
    jokeType: 'Wordplay',
  },
  {
    id: 64,
    jokeText:
      'Why did the golfer bring two pairs of pants? In case he got a hole in one!',
    jokeType: 'Sports',
  },
  {
    id: 65,
    jokeText:
      'Why are ghosts bad at lying? Because you can see right through them!',
    jokeType: 'Wordplay',
  },
  {
    id: 66,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: 'Movies',
  },
  {
    id: 67,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: 'Science',
  },
  {
    id: 68,
    jokeText:
      'I told my wife she was drawing her eyebrows too high. She looked surprised.',
    jokeType: 'Puns',
  },
  {
    id: 69,
    jokeText:
      'What did one ocean say to the other ocean? Nothing, they just waved.',
    jokeType: 'Wordplay',
  },
  {
    id: 70,
    jokeText:
      'Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.',
    jokeType: 'Wordplay',
  },
  {
    id: 71,
    jokeText: 'How do you organize a space party? You planet!',
    jokeType: 'Science',
  },
  {
    id: 72,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: 'Puns',
  },
  {
    id: 73,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: 'Math',
  },
  {
    id: 74,
    jokeText: 'What do you call fake spaghetti? An impasta!',
    jokeType: 'Food',
  },
  {
    id: 75,
    jokeText: 'Why did the tomato turn red? Because it saw the salad dressing!',
    jokeType: 'Food',
  },
  {
    id: 76,
    jokeText:
      'What do you get when you cross a snowman and a vampire? Frostbite!',
    jokeType: 'Wordplay',
  },
  {
    id: 77,
    jokeText:
      'Why did the golfer bring two pairs of pants? In case he got a hole in one!',
    jokeType: 'Sports',
  },
  {
    id: 78,
    jokeText:
      'Why are ghosts bad at lying? Because you can see right through them!',
    jokeType: 'Wordplay',
  },
  {
    id: 79,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: 'Movies',
  },
  {
    id: 80,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: 'Science',
  },
  {
    id: 81,
    jokeText:
      'I told my wife she was drawing her eyebrows too high. She looked surprised.',
    jokeType: 'Puns',
  },
  {
    id: 82,
    jokeText:
      'What did one ocean say to the other ocean? Nothing, they just waved.',
    jokeType: 'Wordplay',
  },
  {
    id: 83,
    jokeText:
      'Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.',
    jokeType: 'Wordplay',
  },
  {
    id: 84,
    jokeText: 'How do you organize a space party? You planet!',
    jokeType: 'Science',
  },
  {
    id: 85,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: 'Puns',
  },
  {
    id: 86,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: 'Math',
  },
  {
    id: 87,
    jokeText: 'What do you call fake spaghetti? An impasta!',
    jokeType: 'Food',
  },
  {
    id: 88,
    jokeText: 'Why did the tomato turn red? Because it saw the salad dressing!',
    jokeType: 'Food',
  },
  {
    id: 89,
    jokeText:
      'What do you get when you cross a snowman and a vampire? Frostbite!',
    jokeType: 'Wordplay',
  },
  {
    id: 90,
    jokeText:
      'Why did the golfer bring two pairs of pants? In case he got a hole in one!',
    jokeType: 'Sports',
  },
  {
    id: 91,
    jokeText:
      'Why are ghosts bad at lying? Because you can see right through them!',
    jokeType: 'Wordplay',
  },
  {
    id: 92,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: 'Movies',
  },
  {
    id: 93,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: 'Science',
  },
  {
    id: 94,
    jokeText:
      'I told my wife she was drawing her eyebrows too high. She looked surprised.',
    jokeType: 'Puns',
  },
  {
    id: 95,
    jokeText:
      'What did one ocean say to the other ocean? Nothing, they just waved.',
    jokeType: 'Wordplay',
  },
  {
    id: 96,
    jokeText:
      'Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.',
    jokeType: 'Wordplay',
  },
  {
    id: 97,
    jokeText: 'How do you organize a space party? You planet!',
    jokeType: 'Science',
  },
  {
    id: 98,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: 'Puns',
  },
  {
    id: 99,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: 'Math',
  },
  {
    id: 100,
    jokeText: 'What do you call fake spaghetti? An impasta!',
    jokeType: 'Food',
  },
];

// exporting the app here so it can be used for testing in endpointTests.js
export default app;
