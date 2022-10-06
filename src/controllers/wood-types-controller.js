const WoodTypeModel = require('../models/wood-type-model');
const {
  createNotFoundErr, 
  sendErrorResponse,
} = require('../helpers/errors/index');
const { deleteEmptyProps } = require('../helpers');
const woodTypeViewModel = require('../view-models/wood-type-view-model');

const createIdDoesNotExistErr = (woodTypeId) => 
createNotFoundErr(`Category with id '${woodTypeId}' does not exist`);

const fetchAll = async (req, res) => {

  try {
    const woodTypeDocuments = await WoodTypeModel.find();
    
    res.status(200).json(woodTypeDocuments.map(woodTypeViewModel));
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const woodTypeId = req.params.id;

  try {
    const woodType = await WoodTypeModel.findById(woodTypeId);

    if (woodType === null) throw createIdDoesNotExistErr(woodTypeId);

    res.status(200).json(woodTypeViewModel(woodType));

  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newWoodTypeDetails = req.body;

  try {
    await WoodTypeModel.validateData(newWoodTypeDetails)

    const newWoodType = await WoodTypeModel.create(newWoodTypeDetails);

    res.status(201).json(woodTypeViewModel(newWoodType));

  } catch (err) {sendErrorResponse(err, res);}
};

const replace = async (req, res) => {
  const woodTypeId = req.params.id;
  const newWoodTypeDetails = req.body;

  try {
    await WoodTypeModel.validateData(newWoodTypeDetails)

    const updatedWoodType = await WoodTypeModel.findByIdAndUpdate(
      woodTypeId,
      newWoodTypeDetails,
      { 
        new: true, 
        runValidators: true,
      }
    );

    if (updatedWoodType === null) throw createIdDoesNotExistErr(woodTypeId);

    res.status(200).json(woodTypeViewModel(updatedWoodType));

  } catch (err) {sendErrorResponse(err, res);}
};

const update = async (req, res) => {
  const woodTypeId = req.params.id;
  const { title } = req.body;
  const newWoodTypeDetails = deleteEmptyProps({ title });

  try {
    await WoodTypeModel.validateUpdateData(newWoodTypeDetails);
    const updatedWoodType = await WoodTypeModel.findByIdAndUpdate(
      woodTypeId,
      newWoodTypeDetails,
      { new: true },
    );

    if (updatedWoodType === null) throw createIdDoesNotExistErr(woodTypeId);

    res.status(200).json(woodTypeViewModel(updatedWoodType))

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const woodTypeId = req.params.id;

  try {
    const removedWoodType = await WoodTypeModel.findByIdAndDelete(woodTypeId);

    if (removedWoodType === null) throw createIdDoesNotExistErr(woodTypeId);

    res.status(200).json(woodTypeViewModel(removedWoodType));
    
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
