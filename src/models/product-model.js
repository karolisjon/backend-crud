const { Schema, model } = require('mongoose');
const yup = require('yup');

const productStructureSchema = Schema({
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

const validationSchema = yup.object().shape({
  title: yup
    .string('Title must always be a string')
    .required('Title is mandatory'),
  description: yup
    .string('Description must always be a string')
    .required('Description is mandatory'),
  categoryId: yup
    .string('categoryId must always be a string')
    .required('categoryId is mandatory'),
  price: yup
    .number('Price must always be a number')
    .required('Price is mandatory')
    .positive('Price must be more than 0'),
  img: yup
    .string('img must always be a string')
    .required('img is mandatory'),
});

const ProductModel = model('Product', productStructureSchema);

module.exports = ProductModel;
