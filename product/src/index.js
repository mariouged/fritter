import path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '../../.env')});
import { initializeDatabase } from './database/connect';
import app from './server';

const port = process.env.SERVER_PORT || 3000;
// Server up
app.listen(port, async () => {
    // connect to database
    await initializeDatabase();
    console.log(`[Product service] Listening at port ${port}`);
});
