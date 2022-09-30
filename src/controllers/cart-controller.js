const { sendErrorResponse } = require('../helpers/errors');
const UserModel = require('../models/user-model');
const cartViewModel = require('../view-models/cart-view-model');

const findProduct = (cart, id) => cart.find((product) => product.productId.toString() === id);

const fetchAll = async (req, res) => {
  res.status(200).json(req.authUser.cart);
};

const create = async (req, res) => {
  const data = req.body;

  try {
    await UserModel.validateCart(data);

    const newProductInCart = {
      productId: data.productId,
      amount: data.amount,
    }

    req.authUser.cart.push(newProductInCart);
    req.authUser.save();
    res.status(200).json(newProductInCart);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    
    res.status(200).json(req.authUser.cart);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
const productId = req.params.id;

  try {
    const foundProductInCart = findProduct(req.authUser.cart, productId);
    if (!foundProductInCart) throw createNotFoundError('Product does not exist in cart');

    req.authUser.cart = req.authUser.cart.filter(x => x.productId.toString() !== productId);

    await req.authUser.save();

    res.status(200).json(cartViewModel(foundProductInCart));
  } catch (error) {
    sendErrorResponse(error, res)
  }
};


module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
};
