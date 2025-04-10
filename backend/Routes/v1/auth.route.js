const express = require("express");
const validate = require("../../middlewares/validate");
const authValidation = require("../../validations/auth.validation");
const authController = require("../../controllers/auth.controller");

const router = express.Router();

router.post('/register',(req,res,n)=>console.log("login "+req.body+n()), validate(authValidation.register), authController.register)
router.post('/login',(req,res,n)=>console.log("login "+req.body+n()),validate(authValidation.login), authController.login)
module.exports = router;
