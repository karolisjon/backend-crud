const categoryViewModel = require('./category-view-model');

const productCategoryPopulatedViewModel = (productCategoryPopulatedDoc) => ({
  id: productCategoryPopulatedDoc._id.toString(),
  title: productCategoryPopulatedDoc.title,
  description: productCategoryPopulatedDoc.description,
  category: categoryViewModel(productCategoryPopulatedDoc.categoryId),
  price: productCategoryPopulatedDoc.price,
  img: productCategoryPopulatedDoc.img,
  woodTypeId: productCategoryPopulatedDoc.woodTypeId,
  createdAt: productCategoryPopulatedDoc.createdAt,
  updatedAt: productCategoryPopulatedDoc.updatedAt,
});

module.exports = productCategoryPopulatedViewModel;
