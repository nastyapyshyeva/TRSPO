const express = require('express');
const app = express();
var rockstars = require('./routes');
app.use('/', rockstars);

const port = process.env.PORT || 3000;
app.listen(port);
