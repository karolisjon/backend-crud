const cartViewModel = require('./cart-view-model');

const userViewModel = (userDocument) => ({
  id: userDocument._id.toString(),
  email: userDocument.email,
  role: userDocument.role,
  cart: userDocument.cart.map(cartViewModel),
  img: userDocument.img,
  createdAt: userDocument.createdAt,
  updatedAt: userDocument.updatedAt,
})

module.exports = userViewModel;
