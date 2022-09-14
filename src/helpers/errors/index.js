const RequestError = require('./request-error');

const createInvalidDataErr = (message) => new RequestError({
  message,
  statusCode: 400
});

const createNotFoundErr = (message) => new RequestError({
  message,
  statusCode: 404
});

const sendErrorResponse = (err, res) => {
  let message;
  let status = 400;

  if (typeof err === 'string') {
      message =  err;
  } else if (err instanceof Error) {
      message =  err.message;
  } else if (err instanceof RequestError) {
      message =  err.message;
      status = err.statusCode;
  } else {
      message =  'Request handler error occurred';
      status = 400;
  }

  res.status(status).json({message});
};
;
const errorCreators = {
  RequestError,
  createInvalidDataErr,
  createNotFoundErr,
  sendErrorResponse,
};

module.exports = errorCreators;
