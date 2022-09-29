const { Router } = require('express');
const cartRouter = require('./cart-router');
const categoriesRouter = require('./categories-router');
const productsRouter = require('./products-router');
const usersRouter = require('./users-router');
const woodTypesRouter = require('./wood-types-router');

const apiRouter = Router();

apiRouter.use('/cart', cartRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/woodTypes', woodTypesRouter);

module.exports = apiRouter;
 