const { ObjectId } = require('mongodb');
const mongo = require('../util/mongo');
const db = mongo.getDb();

exports.getScores = (req, res) => {
  db.collection('scores').find({ difficulty: Number(req.query.difficulty), timestamp: { $gte: Number(req.query.dateRange) } })
    .sort({ time: 1 })
    .limit(10)
    .toArray((err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
  });
};

exports.saveScore = (req, res) => {;
  db.collection('scores').insertOne({
    _id: ObjectId(),
    ...req.body
  }, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
  });
};
