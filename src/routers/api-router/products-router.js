const { Router } = require('express');
const { 
  fetchAll,
  fetchOne,
  post,
  put,
  remove,
} = require('../../controllers/products-controller');

const productsRouter = Router();

productsRouter.get('/', fetchAll);

productsRouter.get('/:id', fetchOne);

productsRouter.post('/', post);

productsRouter.put('/:id', put);

productsRouter.delete('/:id', remove);

module.exports = productsRouter;
 