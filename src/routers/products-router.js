const { Router } = require('express');
const { 
  fetchAll,
  fetchOne,
  post,
  put,
  remove,
} = require('../controllers/products-controller');

const productRouter = Router();

productRouter.get('/', fetchAll);

productRouter.get('/:id', fetchOne);

productRouter.post('/', post);

productRouter.put('/:id', put);

productRouter.delete('/:id', remove);

module.exports = productRouter;
 