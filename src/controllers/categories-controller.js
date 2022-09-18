const CategoryModel = require('../models/category-model');
const {
  createInvalidDataErr, 
  createNotFoundErr, 
  sendErrorResponse,
} = require('../helpers/errors/index');
const { deleteEmptyProps } = require('../helpers');

const createIdDoesNotExistErr = (catId) => 
createNotFoundErr(`Category with id '${catId}' does not exist`);

const createInvalidDetailsErr = (dataObj) => 
createInvalidDataErr('Provided details about the category are invalid');

const fetchAll = async (req, res) => {
  const query = req.query;

  try {
    const categoryDocuments = await CategoryModel.find() 
    
    res.status(200).json(categoryDocuments);
  } catch (err) {sendErrorResponse(err, res);}
};

const fetchOne = async (req, res) => {
  const catId = req.params.id;

  try {
    const category = await CategoryModel.findById(catId);

    if (category === null) throw createIdDoesNotExistErr(catId);

    res.status(200).json(category);

  } catch (err) {sendErrorResponse(err, res);}
};

const post = async (req, res) => {
  const newCategoryDetails = req.body;

  try {
    await CategoryModel.validateData(newCategoryDetails)

    const newCategory = await CategoryModel.create(newCategoryDetails);

    res.status(201).json(newCategory);

  } catch (err) {sendErrorResponse(err, res);}
};

const put = async (req, res) => {
  const catId = req.params.id;
  const newCategoryDetails = req.body;

  try {
    await CategoryModel.validateData(newCategoryDetails)

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      catId,
      newCategoryDetails,
      { new: true, 
        runValidators: true 
      }
    );

    if (updatedCategory === null) throw createIdDoesNotExistErr(catId);

    res.status(200).json(updatedCategory);

  } catch (err) {sendErrorResponse(err, res);}
};

const patch = async (req, res) => {
  const catId = req.params.id;
  const { title, image } = req.body;
  const newCategoryDetails = deleteEmptyProps({ title, image });

  try {
    await CategoryModel.validateUpdateData(newCategoryDetails);
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      catId,
      newCategoryDetails,
      { new: true }
    );

    if (updatedCategory === null) throw createIdDoesNotExistErr(catId);

    res.status(200).json(updatedCategory)

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const catId = req.params.id;

  try {
    const removedCategory = await CategoryModel.findByIdAndDelete(catId);

    if (removedCategory === null) throw createIdDoesNotExistErr(catId);

    res.status(200).json(removedCategory);
    
  } catch (err) {sendErrorResponse(err, res);}
};

module.exports = {
  fetchAll,
  fetchOne,
  post,
  put,
  patch,
  remove,
};
