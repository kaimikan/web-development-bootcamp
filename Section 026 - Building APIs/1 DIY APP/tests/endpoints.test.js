import * as chaiModule from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import supertest from 'supertest';

const request = supertest.agent(app);

const chai = chaiModule.use(chaiHttp);
const { expect } = chai;

// in a real test environment, it's better to create a separate test file for each endpoint

describe('API endpoint /random', function () {
  it('should return a JSON object with a joke', function (done) {
    request.get('/random').end(function (err, res) {
      console.log('From test file: ', res);
      expect(res).to.have.status(200);
      expect(res.body.joke).to.have.property('jokeText');
      // expect(res.body).to.be.json;
      // expect(res.body.message).to.equal('Hello, world!');
      done();
    });
  });
});

describe('API endpoint /jokes/1', function () {
  it('should return joke JSON object with an id of 1', function (done) {
    request.get('/jokes/1').end(function (err, res) {
      console.log('From test file 2: ', res.body);
      const jokeID1 = {
        foundJoke: {
          id: 1,
          jokeText:
            "Why don't scientists trust atoms? Because they make up everything.",
          jokeType: 'Science',
        },
      };
      expect(res).to.have.status(200);
      // notice the .deep here
      expect(res.body).to.deep.equal(jokeID1);
      // expect(res.body).to.be.json;
      // expect(res.body.message).to.equal('Hello, world!');
      done();
    });
  });
});
