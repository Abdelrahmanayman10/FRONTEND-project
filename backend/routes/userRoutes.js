const express = require('express');
const router = express.Router();
const { getUsers, toggleUserRole, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, admin, getUsers);

router.route('/:id')
  .delete(protect, admin, deleteUser);

router.route('/:id/role')
  .patch(protect, admin, toggleUserRole);

module.exports = router;
