const express = require('express');
const productRouter = require('./routers/products-router');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const server = express();

const { SERVER_DOMAIN, SERVER_PROTOCOL, SERVER_PORT } = process.env;
const constantsConfiguredInEnv = SERVER_DOMAIN && SERVER_PROTOCOL && SERVER_PORT;

try {
  if ((!constantsConfiguredInEnv)) {
    throw new Error('Constants must be declared in \'./env\' file');
  }

  server.use(express.json());
  server.use('/products', productRouter);
  server.use(morgan('tiny'));
  server.use(cors());

  server.listen(SERVER_PORT, (err) => {
    if (err) (
      console.error('Something went wrong when starting the server')
    )

    console.log(`Server is running on ${SERVER_PROTOCOL}://${SERVER_DOMAIN}:${SERVER_PORT}`);
  });

} catch (err) {
  console.log(err.message);
};
