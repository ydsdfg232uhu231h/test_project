const express = require('express');
const { register, login } = require('../controllers/authControllers');
const router = express.Router();
router.post("/api/account/sign", register);
router.post("/api/account/login", login);

module.exports = router;