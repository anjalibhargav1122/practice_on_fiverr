const express = require('express');

const router = require('../models/orders');

const app = express();

app.use(express.json());
app.use('/api/orders', router);

module.exports = app;

