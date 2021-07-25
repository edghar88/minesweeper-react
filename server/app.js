const express = require('express');
const app = express();
const distDir = __dirname + "/dist/";
const mongo = require('./util/mongo');
const PORT = process.env.PORT || 3001;

mongo.connectToServer((err, _) => {
  if (err) {
    console.log(err);
  }
  app.use(express.static(distDir));
  app.use(require('body-parser').json());
  app.use(require('./routes'));
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
});
