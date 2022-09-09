const { Schema, model } = require('mongoose');

const productSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const ProductModel = model('Product', productSchema);

module.exports = ProductModel;
