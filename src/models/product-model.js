const { Schema, model, Types } = require('mongoose');
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
    type: Schema.Types.ObjectId,
    ref: 'Category',
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
  woodTypeId: {
    type: Schema.Types.ObjectId,
    ref: 'WoodType',
    required: true,
  },
}, {
  timestamps: true
});

const productValidationSchema = yup.object().shape({
  title: yup
    .string().typeError('product.title must always be a string')
    .required('product.title is mandatory'),
  description: yup
    .string().typeError('product.description must always be a string')
    .required('product.description is mandatory'),
  categoryId: yup
    .string().typeError('product.categoryId must always be a string')
    .test('is-object-id', 
    'product.categoryId must be a valid MongoDB object Id',
    Types.ObjectId.isValid)
    .required('product.categoryId is mandatory'),
  price: yup
    .number().typeError('product.price must always be a number')
    .required('product.price is mandatory')
    .positive('product.price must be more than 0'),
  img: yup
    .string().typeError('product.img must always be a string')
    .required('product.img is mandatory'),
  woodTypeId: yup
    .string().typeError('product.woodTypeId must always be a string')
    .test('is-object-id', 
    'product.woodTypeId must be a valid MongoDB object Id',
    Types.ObjectId.isValid)
    .required('product.woodTypeId is mandatory'),
});

const productUpdateValidationSchema = yup.object().shape({
  title: yup
    .string().typeError('product.title must always be a string'),
  description: yup
    .string().typeError('product.description must always be a string'),
  categoryId: yup
    .string().typeError('product.categoryId must always be a string'),
  price: yup
    .number().typeError('product.price must always be a number')
    .positive('product.price must be more than 0'),
  img: yup
    .string().typeError('product.img must always be a string'),
  woodTypeId: yup
    .string().typeError('product.woodTypeId must always be a string')
});

productSchema.statics.validateData = (productData) => 
productValidationSchema.validate(productData);

productSchema.statics.validateUpdateData = (productData) => 
productUpdateValidationSchema.validate(productData);

const ProductModel = model('Product', productSchema);

module.exports = ProductModel;
