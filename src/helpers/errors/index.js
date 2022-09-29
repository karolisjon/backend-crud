const RequestError = require('./request-error');
const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');

const createInvalidDataErr = (message) => new RequestError({
  message,
  statusCode: 400
});

const createNotFoundErr = (message) => new RequestError({
  message,
  statusCode: 404
});

const createUnauthorizedErr = (message) => new RequestError({
  message,
  statusCode: 401
});

const createForbiddendErr = (message) => new RequestError({
  message,
  statusCode: 403
});

const sendErrorResponse = (err, res) => {
  let message;
  let status = 400;

  if (typeof err === 'string') {
    message = err;
  } else if (err instanceof Error) {
    message = err.message;
  } else if (err instanceof JsonWebTokenError) {
    message = 'Invalid token data ',
      status = 401
  } else if (err instanceof TokenExpiredError) {
    message = 'Token has expired ',
      status = 401
  } else if (err instanceof Error) {
    message = err.message;
  } else {
    message = 'Request handler error occurred';
  }

  res.status(status).json({ message });
};

const errorCreators = {
  RequestError,
  createInvalidDataErr,
  createNotFoundErr,
  createUnauthorizedErr,
  createForbiddendErr,
  sendErrorResponse,
};

module.exports = errorCreators;
