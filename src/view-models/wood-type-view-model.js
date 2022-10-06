const woodTypeViewModel = (woodTypeDocument) => ({
  id: woodTypeDocument._id.toString(),
  title: woodTypeDocument.title,
  createdAt: woodTypeDocument.createdAt,
  updatedAt: woodTypeDocument.updatedAt,
})

module.exports = woodTypeViewModel;
