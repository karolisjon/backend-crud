const { Schema, model } = require('mongoose');
const yup = require('yup');

const categorySchema = Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = categorySchema;
 