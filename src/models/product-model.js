const { Schema, model } = require('mongoose');
const yup = require('yup');

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

const productValidationSchema = yup.object().shape({
  title: yup
    .string('product.title must always be a string')
    .required('product.title is mandatory'),
  description: yup
    .string('product.description must always be a string')
    .required('product.description is mandatory'),
  categoryId: yup
    .string('product.categoryId must always be a string')
    .required('product.categoryId is mandatory'),
  price: yup
    .number('product.price must always be a number')
    .required('product.price is mandatory')
    .positive('product.price must be more than 0'),
  img: yup
    .string('product.img must always be a string')
    .required('product.img is mandatory'),
});

productSchema.statics.validate = (productData) => productValidationSchema.validateSync(productData);

const ProductModel = model('Product', productSchema);

module.exports = ProductModel;
