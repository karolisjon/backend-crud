const UserModel = require('../models/user-model');
const { verifyToken } = require("../helpers/json-web-token");

const requireAuth = async (req, res, next) => {
  console.log(req);
  next();
};

const requireUser = (req, res, next) => {

};

const requireAdmin = (req, res, next) => {

};

module.exports = {
  requireAuth,
  requireUser,
  requireAdmin,
};
