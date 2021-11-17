import { initializeDatabase } from './database/connect';
import { globalErrorHandler, sendResponseHandler } from './middlewares'
import express from 'express';
const app = express();

const port = process.env.SERVER_PORT || 3000;

module.exports.initServer = async () => {

    // server options
    app.use(express.json()) // for parsing application/json
    app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

    // Router
    app.use('/', require('./routes/welcomeRoutes'));
    app.use('/api/v1/product', require('./routes/productRoutes'));
    app.use(globalErrorHandler);
    app.use(sendResponseHandler);

    // Server up
    app.listen(port, async () => {
        // connect to database
        await initializeDatabase();
        console.log(`[Server] Listening at port ${port}`);
    });
}
