const { Router } = require('express');
const categoriesRouter = require('./categories-router');
const productsRouter = require('./products-router');

const apiRouter = Router();

apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/products', productsRouter);

module.exports = apiRouter;
 