const categoryViewModel = require('./category-view-model');
const woodTypeViewModel = require('./wood-type-view-model');

const productEverythingPopulatedViewModel = (productDocument) => ({
  id: productDocument._id.toString(),
  title: productDocument.title,
  description: productDocument.description,
  category: categoryViewModel(productDocument.categoryId),
  price: productDocument.price,
  img: productDocument.img,
  woodType: woodTypeViewModel(productDocument.woodTypeId),
  createdAt: productDocument.createdAt,
  updatedAt: productDocument.updatedAt,
})

module.exports = productEverythingPopulatedViewModel;
