const express = require('express');
const { checkOrCreateUser } = require('../controllers/userController');
const router = express.Router();

// POST /api/users - Check or Create User
router.post('/', checkOrCreateUser);

module.exports = router;
