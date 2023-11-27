const express = require("express");
const {registerValidations,loginValidations} = require("../validations/userValidations");
const {register, login, adminvbc,forgotPassword,resetPassword} = require("../controllers/usersController");
const router = express.Router();
router.post("/register",registerValidations, register);
router.post('/login',loginValidations, login);
router.post('/adminvbc',loginValidations, adminvbc);


//reste password 
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


// adminvbc
module.exports = router;