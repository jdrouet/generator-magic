const {expect} = require('chai');
const supertest = require('supertest');

const server = require('../source/server');

const request = supertest(server);

describe('GET /api', () => {
  it('should be running', () => {
    return request
      .get('/api')
      .expect(200)
      .expect((res) => {
        expect(res.body).to.have.property('running', true);
      });
  });
});
