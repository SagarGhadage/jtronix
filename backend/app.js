const express = require('express');
const routes=require("./Routes/v1/index")
const app = express();
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const { errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const { jwtStrategy } = require("./config/passport");
const helmet = require("helmet");
const passport = require("passport");
// set security HTTP headers - https://helmetjs.github.io/
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

//Initialize passport and add "jwt" authentication strategy
app.use(passport.initialize())
passport.use('jwt',jwtStrategy)
app.get('/', (req, res) => {
    res.send('Hello World!');
}); 

app.use("/v1", routes)

app.use((req, res, next) => {
    next(new ApiError(404, "Not found"));
});

// handle error
app.use(errorHandler);

module.exports=app