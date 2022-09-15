const { Schema, model, Types } = require('mongoose');
const yup = require('yup');

const userSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: [{
      productId: {
        type: Schema.Types.ObjectId,
        ref: Product,
        required: true,
      }
    }],
    amount: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
    }
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
});

userSchema.statics.validate = (productData) => productValidationSchema.validateSync(productData);

const UserModel = model('Product', userSchema);

module.exports = ProductModel;
