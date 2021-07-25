const { MongoClient } = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGO_URL;
let _db;

module.exports = {
  connectToServer: (callback) => {
    MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
      _db  = client.db(process.env.MONGO_DB_NAME);
      return callback(err);
    });
  },

  getDb: () => {
    return _db;
  }
};
