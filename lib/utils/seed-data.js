const csv = require('csvtojson');
const AmazonStock = require('../models/AmazonStock');
const moment = require('moment');

function seedData() {
  return csv()
    .fromFile(__dirname + '/../../csv/AMZNP.csv')
    .then(dayTrades => {
      return dayTrades.map(dayTrade => ({
        date: moment(`${dayTrade.Date}`, 'YYYY-MM-DD').toISOString(),
        open: dayTrade.Open,
        high: dayTrade.High,
        low: dayTrade.Low,
        adj: dayTrade['Adj Close'],
        close: dayTrade.Close,
        volume: dayTrade.volume
      }));
    })
    .then(dailies => AmazonStock.create(dailies));
}

module.exports = seedData;
