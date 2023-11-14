const express = require("express");
const {registerValidations,loginValidations} = require("../validations/userValidations");
const {register, login, adminvbc} = require("../controllers/usersController");
const router = express.Router();
router.post("/register",registerValidations, register);
router.post('/login',loginValidations, login);
router.post('/adminvbc',loginValidations, adminvbc);


// adminvbc
module.exports = router;