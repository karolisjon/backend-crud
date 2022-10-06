const categoryViewModel = require('../view-models/category-view-model');

const productPopulatedViewModel = (productPopulatedDocument) => ({
  id: productPopulatedDocument._id.toString(),
  title: productPopulatedDocument.title,
  description: productPopulatedDocument.description,
  category: categoryViewModel(productPopulatedDocument.categoryId),
  price: productPopulatedDocument.price,
  img: productPopulatedDocument.img,
  woodTypeId: productPopulatedDocument.woodTypeId,
  createdAt: productPopulatedDocument.createdAt,
  updatedAt: productPopulatedDocument.updatedAt,
});

module.exports = productPopulatedViewModel;
