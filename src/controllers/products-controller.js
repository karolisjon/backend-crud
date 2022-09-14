const {correctProductDetails} = require('../helpers/index');
const ProductModel = require('../models/product-model');
const {
  createInvalidDataErr, 
  createNotFoundErr, 
  sendErrorResponse,
} = require('../helpers/errors/index');

const createIdDoesNotExistErr = (productId) => 
createNotFoundErr(`Product with id '${productId}' does not exist`);

const createInvalidDetailsErr = (dataObj) => 
createInvalidDataErr('Provided details about the product are invalid');

const fetchAll = async (req, res) => {
  try {
    const productDocuments = await ProductModel.find() 
    
    res.status(200).json(productDocuments);
  } catch (err) {sendErrorResponse(err, res);}
};

const fetchOne = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await ProductModel.findById(productId);

    if (product === null) throw createIdDoesNotExistErr(productId);

    res.status(200).json(product);

  } catch (err) {sendErrorResponse(err, res);}
};

const post = async (req, res) => {
  const newProductDetails = req.body;

  try {
    if (!correctProductDetails(newProductDetails))
      throw createInvalidDetailsErr(newProductDetails);

    const newProduct = await ProductModel.create(newProductDetails);

    res.status(201).json(newProduct);

  } catch (err) {sendErrorResponse(err, res);}
};

const put = async (req, res) => {
  const productId = req.params.id;
  const newProductDetails = req.body;

  try {
    if (!correctProductDetails(newProductDetails)) throw createInvalidDataErr(newProductDetails);

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      newProductDetails,
      { new: true, runValidators: true }
    );

    if (updatedProduct === null) throw createIdDoesNotExistErr(productId);

    res.status(200).json(updatedProduct);

  } catch (err) {sendErrorResponse(err, res);}
};

const remove = async (req, res) => {
  const productId = req.params.id;

  try {
    const removedProduct = await ProductModel.findByIdAndDelete(productId);

    if (removedProduct === null) throw createIdDoesNotExistErr(productId);

    res.status(200).json(removedProduct);
    
  } catch (err) {sendErrorResponse(err, res);}
};

module.exports = {
  fetchAll,
  fetchOne,
  post,
  put,
  remove,
};
