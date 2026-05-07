const express = require('express');
const { register, login } = require('../controllers/authControllers');
const router = express.Router();
router.post("/account/sign", register);
router.post("/account/login", login);

module.exports = router;