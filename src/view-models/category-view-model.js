const categoryViewModel = (categoryDocument) => ({
  id: categoryDocument._id.toString(),
  title: categoryDocument.title,
  image: categoryDocument.image,
  createdAt: categoryDocument.createdAt,
  updatedAt: categoryDocument.updatedAt,
})

module.exports = categoryViewModel;
