const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const apiRouter = require('./routers/api-router');
const authRouter = require('./routers/auth-router');

const server = express();

const { SERVER_DOMAIN, SERVER_PROTOCOL, SERVER_PORT, DB_CONNECTION_ADMIN } = process.env;
const constantsConfiguredInEnv = SERVER_DOMAIN && SERVER_PROTOCOL && SERVER_PORT && DB_CONNECTION_ADMIN;

try {
  if ((!constantsConfiguredInEnv)) {
    throw new Error('Constants must be declared in \'./env\' file');
  }

  server.use(express.json());
  server.use(morgan('tiny'));
  server.use(cors());
  server.use(express.static('public'));

  server.use('/api', apiRouter);
  server.use('/auth', authRouter);

  mongoose.connect(DB_CONNECTION_ADMIN, (err) => {
    if (err) { 
      throw err.message;
    }

    console.log('Connected to MongoDB Atlass');
    
    server.listen(SERVER_PORT, (err) => {
      if (err) (
        console.error(err.message)
      )
  
      console.log(`Server is running on ${SERVER_PROTOCOL}://${SERVER_DOMAIN}:${SERVER_PORT}`);
    });
  });

} catch (err) {
  console.log(err.message);
};
