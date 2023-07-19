// index.js
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/urlShortener');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => {
  console.log(`URL shortener server listening on port ${PORT}`);
});
