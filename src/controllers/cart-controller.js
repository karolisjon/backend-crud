const { sendErrorResponse, createInvalidDataErr } = require('../helpers/errors');
const UserModel = require('../models/user-model');
const cartViewModel = require('../view-models/cart-view-model');
const { createNotFoundError } = require('../helpers/errors/index');

const findProduct = (cart, id) => cart.find((product) => product.productId.toString() === id);

const fetchAll = async (req, res) => {
  res.status(200).json(req.authUser.cart.map(cartViewModel));
};

const create = async (req, res) => {
  const data = req.body;

  try {
    await UserModel.validateCart(data);

    const foundProduct = findProduct(req.authUser.cart, data.productId);
    if (foundProduct) throw createInvalidDataErr('This product is already in the cart');
    const newProductInCart = {
      productId: data.productId,
      amount: data.amount,
    }

    req.authUser.cart.push(newProductInCart);
    await req.authUser.save();
    res.status(200).json(newProductInCart);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  const data = req.body;

  try {
    await UserModel.validateCart(data);

    const foundProduct = findProduct(req.authUser.cart, data.productId);

    if (!foundProduct) throw createInvalidDataErr('Product with this id was not found in cart');

    foundProduct.amount = data.amount;

    await req.authUser.save();

    res.status(200).json(cartViewModel(foundProduct));
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  const productId = req.params.id;
  
  try {
    const foundProduct = findProduct(req.authUser.cart, productId);
    if (!foundProduct) throw createInvalidDataErr('Product does not exist in cart');

    req.authUser.cart = req.authUser.cart.filter(product =>
      product.productId.toString() !== productId);

    await req.authUser.save();

    res.status(200).json(cartViewModel(foundProduct));
  } catch (error) {
    sendErrorResponse(error, res)
  }
};


module.exports = {
  fetchAll,
  create,
  update,
  remove,
};
