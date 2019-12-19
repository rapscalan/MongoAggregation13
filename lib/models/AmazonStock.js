const mongoose = require('mongoose');

const schema = new mongoose.Schema({
      date: Date,
      open: Number,
      high: Number,
      low: Number,
      close: Number,
      adj: Number,
      volume: Number
  });
  module.exports = mongoose.model('AmazonStock', schema);