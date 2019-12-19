require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Movie = require('../lib/models/AmazonStock');

describe('amazon stock routes', () => {
  beforeAll(() => {
    connect();
  });

  // beforeEach(() => {
  //   return mongoose.connection.dropDatabase();
  // });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new stock daily',()=> {
    const day = new Date();
    return request(app)
      .post('/api/v1/amazonStock')
      .send({
        date: day,
        open: 1900,
        high: 1990,
        low: 1878,
        close: 1950,
        adj: 1955,
        volume: 2000000
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          date: day.toISOString(),
          open: 1900,
          high: 1990,
          low: 1878,
          close: 1950,
          adj: 1955,
          volume: 2000000,
          __v: 0
        });
      });
  });
});
