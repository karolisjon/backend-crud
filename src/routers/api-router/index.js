const { Router } = require('express');
const categoriesRouter = require('./categories-router');
const productsRouter = require('./products-router');
const usersRouter = require('./users-router');

const apiRouter = Router();

apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/users', usersRouter)

module.exports = apiRouter;
 