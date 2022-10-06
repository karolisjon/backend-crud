const productViewModel = (productDocument) => ({
  id: productDocument._id.toString(),
  title: productDocument.title,
  description: productDocument.description,
  categoryId: productDocument.categoryId,
  price: productDocument.price,
  img: productDocument.img,
  woodTypeId: productDocument.woodTypeId,
  createdAt: productDocument.createdAt,
  updatedAt: productDocument.updatedAt,
})

module.exports = productViewModel;
