const CategoryModel = require('../models/category-model');
const {
  createNotFoundErr, 
  sendErrorResponse,
} = require('../helpers/errors/index');
const { deleteEmptyProps } = require('../helpers');

const createIdDoesNotExistErr = (categoryId) => 
createNotFoundErr(`Category with id '${categoryId}' does not exist`);

const fetchAll = async (req, res) => {

  try {
    const categoryDocuments = await CategoryModel.find();
    
    res.status(200).json(categoryDocuments);
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await CategoryModel.findById(categoryId);

    if (category === null) throw createIdDoesNotExistErr(categoryId);

    res.status(200).json(category);

  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newCategoryDetails = req.body;

  try {
    await CategoryModel.validateData(newCategoryDetails)

    const newCategory = await CategoryModel.create(newCategoryDetails);

    res.status(201).json(newCategory);

  } catch (err) {sendErrorResponse(err, res);}
};

const replace = async (req, res) => {
  const categoryId = req.params.id;
  const newCategoryDetails = req.body;

  try {
    await CategoryModel.validateData(newCategoryDetails)

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      newCategoryDetails,
      { 
        new: true, 
        runValidators: true,
      }
    );

    if (updatedCategory === null) throw createIdDoesNotExistErr(categoryId);

    res.status(200).json(updatedCategory);

  } catch (err) {sendErrorResponse(err, res);}
};

const update = async (req, res) => {
  const categoryId = req.params.id;
  const { title, image } = req.body;
  const newCategoryDetails = deleteEmptyProps({ title, image });

  try {
    await CategoryModel.validateUpdateData(newCategoryDetails);
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      newCategoryDetails,
      { new: true },
    );

    if (updatedCategory === null) throw createIdDoesNotExistErr(categoryId);

    res.status(200).json(updatedCategory)

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const removedCategory = await CategoryModel.findByIdAndDelete(categoryId);

    if (removedCategory === null) throw createIdDoesNotExistErr(categoryId);

    res.status(200).json(removedCategory);
    
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
