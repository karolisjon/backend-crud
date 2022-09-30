const { Router } = require('express');
const { 
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
} = require('../../controllers/cart-controller');
const { requireUser } = require('../../middleware/auth-middleware');

const cartRouter = Router();
cartRouter.use(requireUser);

cartRouter.get('/', fetchAll);
cartRouter.get('/:id', fetch);
cartRouter.post('/', create);
cartRouter.put('/:id', replace);
cartRouter.patch('/:id', update);
cartRouter.delete('/:id', remove);

module.exports = cartRouter;
 