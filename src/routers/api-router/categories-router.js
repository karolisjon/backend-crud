const { Router } = require('express');
const { 
  fetchAll,
  fetchOne,
  post,
  put,
  patch,
  remove,
} = require('../../controllers/categories-controller');

const categoriesRouter = Router();

categoriesRouter.get('/', fetchAll);

categoriesRouter.get('/:id', fetchOne);

categoriesRouter.post('/', post);

categoriesRouter.put('/:id', put);

categoriesRouter.patch('/:id', patch);

categoriesRouter.delete('/:id', remove);

module.exports = categoriesRouter;
 