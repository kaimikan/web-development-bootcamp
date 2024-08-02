import * as chaiModule from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import supertest from 'supertest';

const request = supertest.agent(app);

const chai = chaiModule.use(chaiHttp);
const { expect } = chai;

// in a real test environment, it's better to create a separate test file for each endpoint

describe('API endpoint /filter?jokeType=Puns&id=20', function () {
  it('should return a joke JSON objects filtered according to the query parameters', function (done) {
    request.get('/filter?jokeType=Puns&id=20').end(function (err, res) {
      console.log('From FILTER test file: ', res.body);
      const expectedJoke = {
        superFilteredJokes: [
          {
            id: 20,
            jokeText:
              "Why don't some couples go to the gym? Because some relationships don't work out.",
            jokeType: 'Puns',
          },
        ],
      };
      expect(res).to.have.status(200);
      // notice the .deep here
      expect(res.body).to.deep.equal(expectedJoke);
      // expect(res.body).to.be.json;
      // expect(res.body.message).to.equal('Hello, world!');
      done();
    });
  });
});
