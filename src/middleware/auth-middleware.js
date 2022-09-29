const { verifyToken } = require("../helpers/json-web-token");
const { createUnauthorizedErr, sendErrorResponse, createForbiddendErr } = require('../helpers/errors/index');
const UserModel = require('../models/user-model');

const requireAuth = async (req, res, next) => {

  try {
    if (req.headers.authorization === undefined) {
      throw createUnauthorizedErr('User is unauthorized. Header was not found');
    };

    const [_prefix, token] = req.headers.authorization.split(' ');

    if (token === undefined) {
      throw createUnauthorizedErr('User is unauthorized. Token was not found');
    };

    try {
      const tokenData = verifyToken(token);

      const userDocument = await UserModel.findOne({
        email: tokenData.email,
        role: tokenData.role,
      });

      if (userDocument === null) {
        throw createUnauthorizedErr('User does not exist');
      };

      req.authUser = userDocument;

      next(req, res, next);
    } catch (error) {
      throw createUnauthorizedErr('User is unauthorized. Token data is invalid');
    }

  } catch (error) {
    sendErrorResponse(error, res)
  }
};

const requireUser = (req, res, next) => {
  requireAuth(req, res, () => {

    try {
      if (req.authUser.role !== 'USER') {
        throw createForbiddendErr('"User" role is required');
      }

      next()
    } catch (error) {
      sendErrorResponse(error, res);
    }
  });
};

const requireAdmin = (req, res, next) => {
  requireAuth(req, res, () => {

    try {
      if (req.authUser.role !== 'ADMIN') {
        throw createForbiddendErr('"Admin" role is required');
      }

      next()
    } catch (error) {
      sendErrorResponse(error, res);
    }
  });
};

module.exports = {
  requireAuth,
  requireUser,
  requireAdmin,
};
