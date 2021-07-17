const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user-model');
const HttpError = require('../models/http-error');
const generateToken = require('../utils/generate-token');

// get all users - private, admin

const getAllUsers = async (req, res, next) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  try {
    const count = await User.countDocuments({});
    const users = await User.find({}, '-password')
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ users, page, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }
};

// register user

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs.', 422));
  }

  const { name, email, password } = req.body;

  try {
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      const error = new HttpError('User already exist.', 400);
      return next(error);
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      const error = new HttpError('Something went wrong.', 500);
      return next(error);
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      const { _id, name, email, isAdmin } = user;
      res.status(201).json({
        user: { _id, name, email, isAdmin, token: generateToken(_id) },
      });
    }
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }
};

// log in user

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError('Invalid inputs.', 422);
    return next(error);
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError('Invalid inputs.', 422);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError('Invalid inputs.', 422);
    return next(error);
  }

  if (existingUser) {
    const { _id, name, email, isAdmin } = existingUser;
    res.json({
      user: { _id, name, email, isAdmin, token: generateToken(existingUser._id) },
    });
  }
};

// get user info - private

const getUserInfo = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  try {
    if (user) {
      const { _id, name, email, isAdmin } = user;
      res.json({ user: { _id, name, email, isAdmin } });
    } else {
      const error = new HttpError('User not found.', 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }
};

// update user profile - private

const updateUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      if (updatedUser) {
        const { _id, name, email, isAdmin } = updatedUser;
        res.json({
          user: {
            _id,
            name,
            email,
            isAdmin,
            token: generateToken(_id),
          },
        });
      }
    } else {
      const error = new HttpError('User not found.', 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }
};

// delete user - private, admin

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.json({ message: 'User removed.' });
    } else {
      const error = new HttpError('User not found.', 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }
};

// get user by id -  private, admin

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
      res.json({ user });
    } else {
      const error = new HttpError('User not found.', 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }
};

// update user - private, admin

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin;

      const updatedUser = await user.save();

      res.json({
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
        },
      });
    } else {
      const error = new HttpError('User not found.', 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }
};

module.exports = {
  getAllUsers,
  register,
  login,
  getUserInfo,
  updateUserInfo,
  deleteUser,
  getUserById,
  updateUser,
};
