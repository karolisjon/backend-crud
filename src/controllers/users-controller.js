const UserModel = require('../models/user-model');
const {
  createInvalidDataErr, 
  createNotFoundErr, 
  sendErrorResponse,
} = require('../helpers/errors/index');

const createIdDoesNotExistErr = (userId) => 
createNotFoundErr(`Product with id '${userId}' does not exist`);

const createInvalidDetailsErr = (dataObj) => 
createInvalidDataErr('Provided details about the product are invalid');

const fetchAll = async (req, res) => {
  
  try {
    const userDocuments = await UserModel.find();

    console.log('BEFORE');
    const validationResult = await UserModel.validate({
       email: 'kjon2@gmail.com',
       password: 'Gubernija7890?',
       img: 'https://pbs.twimg.com/profile_images/378800000822546629/1cee2b888711ac763621327f568a513d_400x400.jpeg,'
    })

    console.log(validationResult);
    console.log('AFTER');
    
    res.status(200).json(userDocuments);
  } catch (err) {sendErrorResponse(err, res);}
};

const fetchOne = async (req, res) => {
  const userId = req.params.id;
  const { joinBy } = req.query;

  try {
    const user = joinBy === 'userId'
    ? await UserModel.findById(userId).populate('userId')
    : await UserModel.findById(userId);

    if (user === null) throw createIdDoesNotExistErr(userId);

    res.status(200).json(user);

  } catch (err) {sendErrorResponse(err, res);}
};

const post = async (req, res) => {
  const newUserDetails = req.body;

  try {
    await UserModel.validateData(newUserDetails)

    const newUser = await UserModel.create(newUserDetails);

    res.status(201).json(newUser);

  } catch (err) {sendErrorResponse(err, res);}
};

const put = async (req, res) => {
  const userId = req.params.id;
  const newUserDetails = req.body;

  try {
    await UserModel.validateData(newUserDetails)

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      newUserDetails,
      { new: true, runValidators: true }
    );

    if (updatedUser === null) throw createIdDoesNotExistErr(userId);

    res.status(200).json(updatedUser);

  } catch (err) {sendErrorResponse(err, res);}
};

const remove = async (req, res) => {
  const userId = req.params.id;

  try {
    const removedUser = await UserModel.findByIdAndDelete(userId);

    if (removedUser === null) throw createIdDoesNotExistErr(userId);

    res.status(200).json(removedUser);
    
  } catch (err) {sendErrorResponse(err, res);}
};

module.exports = {
  fetchAll,
  fetchOne,
  post,
  put,
  remove,
};
