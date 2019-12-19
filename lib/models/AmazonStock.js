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

  schema.statics.avgHighPerMonthPerYear = function() {
    return this.aggregate([
      {
        '$addFields': {
          'month': {
            '$month': '$date'
          }, 
          'year': {
            '$year': '$date'
          }, 
          'dayOfMonth': {
            '$dayOfMonth': '$date'
          }, 
          'dayOfWeek': {
            '$dayOfWeek': '$date'
          }
        }
      }, {
        '$group': {
          '_id': {
            'year': '$year', 
            'month': '$month'
          }, 
          'avgHighPerMonthPerYear': {
            '$avg': '$high'
          }
        }
      }, {
        '$sort': {
          '_id': 1
        }
      }
    ]);
  };

  schema.statics.avgHighForAYear = function() {
    return this.aggregate(
      [
        {
          '$addFields': {
            'month': {
              '$month': '$date'
            }, 
            'year': {
              '$year': '$date'
            }, 
            'dayOfMonth': {
              '$dayOfMonth': '$date'
            }, 
            'dayOfWeek': {
              '$dayOfWeek': '$date'
            }
          }
        }, {
          '$group': {
            '_id': '$year', 
            'avgHigh': {
              '$avg': '$high'
            }
          }
        }
      ]
    );
  };
  module.exports = mongoose.model('AmazonStock', schema);