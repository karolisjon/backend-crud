const woodTypeViewModel = require('./wood-type-view-model');

const productWoodTypePopulatedViewModel = (productWoodTypePopulatedDoc) => ({
  id: productWoodTypePopulatedDoc._id.toString(),
  title: productWoodTypePopulatedDoc.title,
  description: productWoodTypePopulatedDoc.description,
  categoryId: productWoodTypePopulatedDoc.categoryId,
  price: productWoodTypePopulatedDoc.price,
  img: productWoodTypePopulatedDoc.img,
  woodType: woodTypeViewModel(productWoodTypePopulatedDoc.woodTypeId),
  createdAt: productWoodTypePopulatedDoc.createdAt,
  updatedAt: productWoodTypePopulatedDoc.updatedAt,
});

module.exports = productWoodTypePopulatedViewModel;
