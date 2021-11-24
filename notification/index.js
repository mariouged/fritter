const server = require('./server');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env')});
const { init } = require('./consumer');

const port = process.env.NOTIFICATION_SERVICE_PORT || 3001;

server.listen(3001, async() => {
    await init()
    console.log(`[Notification service] Listening at port ${port}`);
    ;
});