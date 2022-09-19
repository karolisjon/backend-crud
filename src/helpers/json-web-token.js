const jwt = require('jsonwebtoken');

const createToken = ({ email, role }) => jwt.sign({ email, role }, process.env.TOKEN_SECRET);

const verifyToken = (token) => jwt.verify(token, process.env.TOKEN_SECRET);

module.exports = {
  createToken,
  verifyToken,
};
