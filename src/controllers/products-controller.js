const ProductModel = require('../models/product-model');
const {
  createNotFoundErr, 
  sendErrorResponse,
} = require('../helpers/errors/index');
const productViewModel = require('../view-models/product-view-model');
const productCategoryPopulatedViewModel = require('../view-models/product-category-view-model');
const productWoodTypePopulatedViewModel = require('../view-models/product-wood-type-view-model');
const productEverythingPopulatedViewModel = require('../view-models/product-everything-populated-view-model');

const createIdDoesNotExistErr = (productId) => 
createNotFoundErr(`Product with id '${productId}' does not exist`);

const fetchAll = async (req, res) => {
  const { joinBy } = req.query;
  let productDocuments = await ProductModel.find();
  const joinedByCategory = joinBy === 'categoryId';
  const joinedByWoodType = joinBy === 'woodTypeId';
  const joinedByEverything = joinBy instanceof Array;
  
  try {
    if (joinedByCategory) {
      productDocuments = await ProductModel.find().populate('categoryId');
    } else if (joinedByWoodType) {
      productDocuments = await ProductModel.find().populate('woodTypeId');
    } else if (joinedByEverything) {
      productDocuments = await ProductModel.find().populate('categoryId').populate('woodTypeId');
    } else await ProductModel.find();

    res.status(200).json(
      joinedByCategory ? productDocuments.map(productCategoryPopulatedViewModel) :
      joinedByWoodType ? productDocuments.map(productWoodTypePopulatedViewModel) :
      joinedByEverything ? productDocuments.map(productEverythingPopulatedViewModel) :
      productDocuments.map(productViewModel)
      );
  } catch (err) {sendErrorResponse(err, res);}
};

const fetch = async (req, res) => {
  const productId = req.params.id;
  const { joinBy } = req.query;
  let productDocument = await ProductModel.findById(productId);
  const joinedByCategory = joinBy === 'categoryId';
  const joinedByWoodType = joinBy === 'woodTypeId';
  const joinedByEverything = joinBy instanceof Array;

  try {

    if (joinedByCategory) {
      productDocument = await ProductModel.findById(productId).populate('categoryId');
    } else if (joinedByWoodType) {
      productDocument = await ProductModel.findById(productId).populate('woodTypeId');
    } else if (joinedByEverything) {
      productDocument = await ProductModel.findById(productId).populate('categoryId').populate('woodTypeId');
    }

    if (productDocument === null) throw createIdDoesNotExistErr(productId);

    res.status(200).json(
      joinedByCategory ? productCategoryPopulatedViewModel(productDocument) :
      joinedByWoodType ? productWoodTypePopulatedViewModel(productDocument) :
      joinedByEverything ? productEverythingPopulatedViewModel(productDocument) :
      productViewModel(productDocument)
    );

  } catch (err) {sendErrorResponse(err, res);}
};

const create = async (req, res) => {
  const newProductDetails = req.body;

  try {
    await ProductModel.validateData(newProductDetails)

    const newProduct = await ProductModel.create(newProductDetails);

    res.status(201).json(productViewModel(newProduct));

  } catch (err) {sendErrorResponse(err, res);}
};

const replace = async (req, res) => {
  const productId = req.params.id;
  const newProductDetails = req.body;

  try {
    await ProductModel.validateData(newProductDetails)

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      newProductDetails,
      { 
        new: true, 
        runValidators: true,
      }
    );

    if (updatedProduct === null) throw createIdDoesNotExistErr(productId);

    res.status(200).json(productViewModel(updatedProduct));

  } catch (err) {sendErrorResponse(err, res);}
};

const update = async (req, res) => {
  const productId = req.params.id;
  const { title, description, categoryId, price, img } = req.body;
  const newProductDetails = ({ title, description, categoryId, price, img });

  try {
    await ProductModel.validateUpdateData(newProductDetails);

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      newProductDetails,
      { new: true }
    );

    if (updatedProduct === null) throw createIdDoesNotExistErr(productId);

    res.status(200).json(productViewModel(updatedProduct))

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const productId = req.params.id;

  try {
    const removedProduct = await ProductModel.findByIdAndDelete(productId);

    if (removedProduct === null) throw createIdDoesNotExistErr(productId);

    res.status(200).json(productViewModel(removedProduct));
    
  } catch (err) {sendErrorResponse(err, res);}
};

module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
};
