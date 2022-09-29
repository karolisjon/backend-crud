const UserModel = require('../models/user-model');

const fetchAll = async (req, res) => {

  res.send('all products in the cart');
}

module.exports = {
  fetchAll,
};
