const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService } = require("../services");
const ApiError = require("../utils/ApiError");


const register = catchAsync(async (req, res) => {
  const user=await userService.createUser(req.body)
  // console.log(user)
  const tokens=await tokenService.generateAuthTokens(user)
  res.status(201).send({user,tokens})
});


const login = catchAsync(async (req, res) => {
  console.log(req.body)
  // let userdetails=await userService.getUserByEmail(req.body.email)
  // console.log(userdetails)
  let user=await authService.loginUserWithEmailAndPassword(req.body.email,req.body.password)
  if(user){
    const tokens=await tokenService.generateAuthTokens(user)
    res.status(200).send({user,tokens}) 
  }else{
    new ApiError(401,'invalid credentials ')
  }
});

module.exports = {
  register,
  login,
};
