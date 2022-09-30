const { Router } = require('express');
const { 
  fetchAll,
  create,
  update,
  remove,
} = require('../../controllers/cart-controller');
const { requireUser } = require('../../middleware/auth-middleware');

const cartRouter = Router();
cartRouter.use(requireUser);

cartRouter.get('/', fetchAll);
cartRouter.post('/', create);
cartRouter.patch('/:id', update);
cartRouter.delete('/:id', remove);

module.exports = cartRouter;
 