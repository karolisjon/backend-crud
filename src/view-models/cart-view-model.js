const cartViewModel = (cartDocument) => ({
  productId: cartDocument.productId.toString(),
  amount: cartDocument.amount,
})

module.exports = cartViewModel;
