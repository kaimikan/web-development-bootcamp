import * as chaiModule from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import supertest from 'supertest';

const request = supertest.agent(app);

const chai = chaiModule.use(chaiHttp);
const { expect } = chai;

// in a real test environment, it's better to create a separate test file for each endpoint

describe('API endpoint /jokes', function () {
  it('should return a joke JSON object that has been added with matching jokeText and jokeType to the inputs', function (done) {
    const requestBody = {
      jokeText: 'TestText',
      jokeType: 'TestType',
    };

    // we need the bodyParser json in the index.js to help with the add.test.js request since otherwise the body we send is undefined
    request
      .post('/jokes')
      .send(requestBody)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end(function (err, res) {
        console.log('From ADD test file: ', res._data);
        const expectedJoke = {
          //id: 20,
          jokeText: 'TestText',
          jokeType: 'TestType',
        };
        expect(res).to.have.status(200);
        // notice the .deep here
        expect(res.body.jokeText).to.equal(expectedJoke.jokeText);
        expect(res.body.jokeType).to.equal(expectedJoke.jokeType);
        // expect(res.body).to.be.json;
        // expect(res.body.message).to.equal('Hello, world!');
        done();
      });
  });
});
