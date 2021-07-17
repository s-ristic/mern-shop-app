const express = require('express');
const { check } = require('express-validator');

const {
  getAllUsers,
  register,
  login,
  getUserInfo,
  updateUserInfo,
  deleteUser,
  getUserById,
  updateUser,
} = require('../controllers/user-controller');
const { private, admin } = require('../middleware/auth-middleware.js');

const router = express.Router();

const checkRegister = [
  check('name').not().isEmpty(),
  check('email').normalizeEmail().isEmail(),
  check('password').isLength({ min: 6 }),
];

router.get('/profile', private, getUserInfo);
router.get('/:id', private, admin, getUserById);
router.get('/', private, admin, getAllUsers);
router.delete('/:id', private, admin, deleteUser);
router.put('/profile', private, updateUserInfo);
router.put('/:id', private, admin, updateUser);
router.post('/', checkRegister, register);
router.post('/login', login);

module.exports = router;
