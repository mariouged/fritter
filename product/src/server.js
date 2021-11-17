import { globalErrorHandler, sendResponseHandler } from './middlewares'
import express from 'express';
const app = express();

// server options
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Router
app.use('/', require('./routes/welcomeRoutes'));
app.use('/api/v1/product', require('./routes/productRoutes'));
app.use(globalErrorHandler);
app.use(sendResponseHandler);

module.exports = app;
