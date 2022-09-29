const { Router } = require('express');
const { 
  fetchAll,
  // fetch,
  // create,
  // replace,
  // update,
  // remove,
} = require('../../controllers/cart-controller');

const cartRouter = Router();

cartRouter.get('/', fetchAll);

module.exports = cartRouter;
 