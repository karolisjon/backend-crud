const { Schema, model, Types } = require('mongoose');
const yup = require('yup');
const ProductModel = require('./product-model');

const userSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
  cart: {
    type: [{
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      }
    }],
  },
  img: {
    type: String,
  },
}, {
  timestamps: true
});

const cartValidationSchema = yup.object({
  productId: yup
    .string().typeError('user.cart element.productId must always be a string')
    .test('is-object-id',
      'user.cart element.productId must be a valid MongoDB object Id',
      Types.ObjectId.isValid)
    .test('product-is-in-cart',
      'product with provided productId was not found',
      async (productId) => {
        const foundProduct = await ProductModel.exists({ _id: productId });

        return foundProduct;
      }),
  amount: yup
    .number().typeError('user.cart element.amount must always be a number')
    .positive('user.cart element.amount should be more than 0')
    .required('cart.amount is mandatory')
});

const userValidationSchema = yup.object({
  email: yup
    .string().typeError('user.email must always be a string')
    .email('user.email format is invalid')
    .test('email-check',
      'Provided email address is already in use',
      async (email) => {
        const foundUsers = await UserModel.findOne({ email });

        return foundUsers === null;
      })
    .required('user.email is mandatory'),
  password: yup
    .string().typeError('user.password must always be a string')
    .required('user.password is mandatory')
    .min(8, 'user.password must contain at least 8 symbols')
    .max(32, 'user.password must not be longer than 32 symbols')
    .matches(/[a-z]/, 'user.password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'user.password must contain at least one uppercase letter')
    .matches(/\d/, 'user.password must contain at least one number')
    .matches(/\W/, 'user.password must contain at least one special symbol'),
  passwordConfirmation: yup
    .string().typeError('user.password must always be a string')
    .required('user.passwordConfirmation is mandatory')
    .oneOf([yup.ref('password')], 'Provided passwords do not match'),
  role: yup
    .string().typeError('user.role must always be a string')
    .oneOf(['USER', 'ADMIN']),
  cart: yup.array(cartValidationSchema),
  img: yup
    .string().typeError('user.img must always be a string')
});

const userUpdateValidationSchema = yup.object({
  email: yup
    .string().typeError('user.email must always be a string')
    .email('user.email format is invalid')
    .test('email-check',
      'Provided email address is already in use',
      async (email) => {
        const foundUsers = await UserModel.findOne({ email });

        return foundUsers === null;
      }),
  password: yup
    .string().typeError('user.password must always be a string')
    .min(8, 'user.password must contain at least 8 symbols')
    .max(32, 'user.password must not be longer than 32 symbols')
    .matches(/[a-z]/, 'user.password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'user.password must contain at least one uppercase letter')
    .matches(/\d/, 'user.password must contain at least one number')
    .matches(/\W/, 'user.password must contain at least one special symbol'),
  passwordConfirmation: yup
    .string().typeError('user.password must always be a string')
    .oneOf([yup.ref('password')], 'Provided passwords do not match'),
  role: yup
    .string().typeError('user.role must always be a string')
    .oneOf(['USER', 'ADMIN']),
  cart: yup.array(cartValidationSchema),
  img: yup
    .string().typeError('user.img must always be a string')
});

userSchema.statics.validateData = (userData) =>
  userValidationSchema.validate(userData);

userSchema.statics.validateUpdateData = (userData) =>
  userUpdateValidationSchema.validate(userData);

userSchema.statics.validateCart = (cart) =>
  cartValidationSchema.validate(cart);

const UserModel = model('User', userSchema);

module.exports = UserModel;
