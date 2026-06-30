const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Crimesanket backend is running!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});