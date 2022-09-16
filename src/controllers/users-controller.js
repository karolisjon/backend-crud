const UserModel = require('../models/user-model');
const {
  createInvalidDataErr,
  createNotFoundErr,
  sendErrorResponse,
} = require('../helpers/errors/index');
const { comparePasswords, hashPassword } = require('../helpers/hash.js');

const createIdDoesNotExistErr = (userId) =>
  createNotFoundErr(`Product with id '${userId}' does not exist`);

const createInvalidDetailsErr = (dataObj) =>
  createInvalidDataErr('Provided details about the product are invalid');

const fetchAll = async (req, res) => {

  try {
    const userDocuments = await UserModel.find();

    res.status(200).json(userDocuments);
  } catch (err) { sendErrorResponse(err, res); }
};

const fetchOne = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId);

    if (user === null) throw createIdDoesNotExistErr(userId);

    res.status(200).json(user);

  } catch (err) { sendErrorResponse(err, res); }
};

const post = async (req, res) => {
  const requestData = req.body;

  try {
    await UserModel.validateData(requestData);
    const {
      email,
      password,
      role,
      cart,
      img
    } = requestData;

    const newUser = await UserModel.create({
      email,
      password: await hashPassword(password),
      role,
      cart,
      img
    });

    res.status(201).json(newUser);

  } catch (err) { sendErrorResponse(err, res); }
};

const put = async (req, res) => {
  const userId = req.params.id;
  const requestData = req.body;

  try {
    await UserModel.validateData(requestData)
    const {
      email,
      password,
      role,
      cart,
      img
    } = requestData;

    const replacedUser = await UserModel.findOneAndReplace(
      { userId },
      {
        email,
        password: await hashPassword(password),
        role,
        cart,
        img
      },
      { new: true }
    );

    if (replacedUser === null) throw createIdDoesNotExistErr(userId);

    res.status(200).json(replacedUser);

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const userId = req.params.id;

  try {
    const removedUser = await UserModel.findByIdAndDelete(userId);

    if (removedUser === null) throw createIdDoesNotExistErr(userId);

    res.status(200).json(removedUser);

  } catch (err) { sendErrorResponse(err, res); }
};

module.exports = {
  fetchAll,
  fetchOne,
  post,
  put,
  remove,
};
