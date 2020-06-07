const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 5000;

const orders = require('./routes/orders');

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin','*');
  res.set('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
  res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type,Authorization');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/orders', orders);

app.get('*', (req, res) => {
  res.status(404).send({message: 'Not Found'});
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});