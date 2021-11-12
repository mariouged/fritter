const {resolve} = require('path');
require('dotenv').config({ path: resolve(__dirname, '../.env')});

const { initApp } = require('./initApp');

initApp();
