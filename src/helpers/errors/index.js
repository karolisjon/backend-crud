const RequestError = require('./request-error');

const createInvalidDataErr = (message) => new RequestError({
  message,
  statusCode: 400
});

const createNotFoundErr = (message) => new RequestError({
  message,
  statusCode: 404
});

const formatRequestErrResponse = (err) => {
  if (typeof err === 'string') {
    return {
      message: err,
      status: 400
    };
  } else if (err instanceof Error) {
    return {
      message: err.message,
      status: 400
    };
  } else if (err instanceof RequestError) {
    return {
      message: err.message,
      status: err.statusCode
    };
  } else {
    return {
      message: 'Request handler error occurred',
      status: 400
    };
  }
};

const errorCreators = {
  RequestError,
  createInvalidDataErr,
  createNotFoundErr,
  formatRequestErrResponse,
};

module.exports = errorCreators;
