const { Router } = require('express');
const { 
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
} = require('../../controllers/wood-types-controller');

const woodTypesRouter = Router();

woodTypesRouter.get('/', fetchAll);
woodTypesRouter.get('/:id', fetch);
woodTypesRouter.post('/', create);
woodTypesRouter.put('/:id', replace);
woodTypesRouter.patch('/:id', update);
woodTypesRouter.delete('/:id', remove);

module.exports = woodTypesRouter;
 