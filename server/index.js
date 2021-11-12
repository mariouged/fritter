require('dotenv').config()
const express = require('express');
const app = express();

const port = process.env.SERVER_PORT || 3000;

// Router
app.use('/', require('./routes/welcomeRoutes'));

// Server up
app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
