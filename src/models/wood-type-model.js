const { Schema, model } = require('mongoose');
const yup = require('yup');

const woodTypeSchema = Schema({
  title: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const woodTypeValidationSchema = yup.object().shape({
  title: yup
    .string('wood.title must always be a string')
    .required('wood.title is mandatory'),
});

const woodTypeUpdateValidationSchema = yup.object().shape({
  title: yup.string().typeError('wood.title must always be a string'),
});

woodTypeSchema.statics.validateData = (woodTypeData) => 
woodTypeValidationSchema.validate(woodTypeData);

woodTypeSchema.statics.validateUpdateData = (woodTypeData) => 
woodTypeUpdateValidationSchema.validate(woodTypeData);

const WoodTypeModel = model('WoodType', woodTypeSchema);

module.exports = WoodTypeModel;
