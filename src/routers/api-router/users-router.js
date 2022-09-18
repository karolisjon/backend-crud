const { Router } = require('express');
const { 
  fetchAll,
  fetchOne,
  post,
  put,
  patch,
  remove,
} = require('../../controllers/users-controller');

const usersRouter = Router();

usersRouter.get('/', fetchAll);

usersRouter.get('/:id', fetchOne);

usersRouter.post('/', post);

usersRouter.put('/:id', put);

usersRouter.patch('/:id', patch);

usersRouter.delete('/:id', remove);

module.exports = usersRouter;
 