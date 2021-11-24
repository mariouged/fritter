const app = require('express')();

const cors = require('cors');

app.use(cors());

const server = require('http').Server(app);

module.exports = server;