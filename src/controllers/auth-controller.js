const UserModel = require('../models/user-model');
const { sendErrorResponse } = require('../helpers/errors/index');
const { comparePasswords, hashPassword } = require('../helpers/hash');
const { createToken } = require('../helpers/json-web-token');

const login = async (req, res) => {
  const { email, password } = req.body;
  const credsExist = Boolean(email && password);

  try {
    if (!credsExist) throw new Error('Authentication failed due to missing credentials');

    const userDoc = await UserModel.findOne({ email });

    if (userDoc === null) throw new Error(`Login failed. User with email '${email}' does not exist`);
    
    const passwordsMatch = await comparePasswords(password, userDoc.password);
    if (!passwordsMatch) throw new Error('Login failed. The password you entered is incorrect');

    res.status(200).json({ 
      user: userDoc,
      token: createToken({ email: userDoc.email, role: userDoc.role }),
    });
  } catch (err) { sendErrorResponse(err, res); }

};

const register = async (req, res) => {
  const requestData = req.body;

  try {
    await UserModel.validateData(requestData);
    const { email, password, img } = requestData;

    const newUser = await UserModel.create({
      email,
      password: await hashPassword(password),
      img,
    });

    res.status(201).json({
      user: newUser,
      token: createToken({ email: newUser.email, role: newUser.role }),
    });

  } catch (err) { sendErrorResponse(err, res); }
};

module.exports = { login, register };
