const { Router } = require('express');
const AmazonStock = require('../models/AmazonStock');

module.exports = Router()
  .post('/', (req, rest, next) => {
    AmazonStock
      .create(req.body)
      .then(day => rest.send(day))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    AmazonStock
      .find()
      .then(allTrades => res.send(allTrades))
      .catch(next);
  });