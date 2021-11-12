const connect = require('./database/connetMariaDB');
const express = require('express');
const app = express();

const port = process.env.SERVER_PORT || 3000;

module.exports.initApp = async () => {

    // init DB
    // connect to database
    await connect.createConnection();

    // init server
    // Router
    app.use('/', require('./routes/welcomeRoutes'));

    // Server up
    app.listen(port, () => {
        console.log(`[Server] Listening at port ${port}`);
    });
}