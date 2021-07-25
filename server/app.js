const express = require('express');
const app = express();
const mongo = require('./util/mongo');
const PORT = process.env.PORT || 3001;

mongo.connectToServer((err, _) => {
  if (err) {
    console.log(err);
  }
  app.use(require('body-parser').json());
  app.use(require('./routes'));
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
});
