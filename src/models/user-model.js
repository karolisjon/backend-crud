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
  },
  img: {
    type: String,
  }
}, {
  timestamps: true
});
 
const userValidationSchema = yup.object({
  email: yup
    .string().typeError('user.email must always be a string')
    .email('user.email format is invalid')
    .test('email-check',
    'Provided email address is already in use',
    () => {
      console.log('\n\nUserMode.find\n');
      console.log(UserModel.find);
      console.log('\n\n');
      
      return true;
    })
    .required('user.email is mandatory'),
  password: yup
    .min(8, 'user.password must contain at least 8 symbols')
    .max(32, 'user.password must not be longer than 32 symbols')
    .matches(/[a-z]/, 'user.password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'user.password must contain at least one uppercase letter')
    .matches(/\d/, 'user.password must contain at least one number')
    .matches(/\W/, 'user.password must contain at least one special symbol'),
  cart: yup
    .array(yup.object({
      productId: yup
        .string().typeError('user.cart element.productId must always be a string')
        .test('is-object-id',
          'user.cart element.productId must be a valid MongoDB object Id',
          Types.ObjectId.isValid)
        .required('user.cart element.productId is mandatory'),
      amount: yup
        .number().typeError('user.cart.amount must always be a number')
        .required('user.cart.amount is mandatory')
    }))
    .required('user.categoryId is mandatory'),
  img: yup
    .string().typeError('user.img must always be a string')
});

userSchema.statics.validate = (userData) => userValidationSchema.validateSync(userData);

const UserModel = model('User', userSchema);

module.exports = UserModel;
 