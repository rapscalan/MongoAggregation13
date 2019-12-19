const fs = require('fs').promises;
const mongoose = require('mongoose');
const moment = require('moment');
const csv = require('csvtojson');

mongoose.connect('mongodb://localhost:27017/nameRank', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
mongoose.connection.dropDatabase();

// const schema = new mongoose.Schema({
//     date: Date,
//     open: Number,
//     high: Number,
//     low: Number,
//     close: Number,
//     adj: Number,
//     volume: Number
// });
//const Stock = mongoose.model('AmznStock', schema);
const schema = new mongoose.Schema({
  rank: Number,
  nameM: String,
  numberM: Number,
  nameF: String,
  numberF: Number,
  decade: Number
});
const NameRank = mongoose.model('NameRank', schema);
let decade;
fs.readdir('./csv/names')
  .then(files => {
    return Promise.all(
      files.map(file => {
        decade = file.replace(/\D+(\d\d\d\d).*/g, "$1");
        console.log(decade);
        return csv({
          delimiter: ','
        })
          .fromFile(`./csv/names/${file}`)
      })
    )
  })
  .then(csvToJsonFiles => {
    const quotes = csvToJsonFiles
      .flat()
      .map(name => ({
        rank: name.Rank,
        nameM: name.Name1,
        numberM: name.Number1.replace(/,/g, ''),
        nameF: name.Name2,
        numberF: name.Number2.replace(/,/g, ''),
        decade: decade
      }))
      // .map(daily => ({
      //   date: moment(`${daily.Date}`, 'YYYY-MM-DD').toISOString(),
      //   open: daily.Open,
      //   high: daily.High,
      //   low: daily.Low,
      //   close: daily.Close,
      //   adj: daily['Adj Close'],
      //   volume: daily.Volume
      // }))
      return NameRank.create(quotes);
  })
  .then(() => console.log('done'));