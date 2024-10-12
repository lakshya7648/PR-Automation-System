/**
 * Node Modules
 */
const express = require('express');
require('dotenv').config();
const cors = require('cors');

/**
 * User Defined Modules
 */
const connectToDatabase = require('./DBConnection/db');
const logger = require('./Logger/logger');

const app = express();
const port = process.env.PORT;

connectToDatabase();

app.use(cors());
app.use(express.json());

app.get('/v1/api/', (req, res) => {
  logger.info('Got the request and response sent successfully', {
    endpoint: '/v1/api/',
    method: 'GET',
  });

  return res.status(200).json({ message: 'Welcome to the version 1 of API' });
});

app.use('/v1/api/auth/', require('./routes/Auth'));
app.use('/v1/api/hooks/', require('./routes/HandleWebHooks'));

app.listen(port, () => {
  console.log(`PR Review System Backend is listening on port ${port}`);
});
