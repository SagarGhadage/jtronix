const { User } = require("../models");
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");

// class UserService {
/**
 * Get User by id
 * - Fetch user object from Mongo using the "_id" field and return user object
 * @param {String} id
 * @returns {Promise<User>}
 */
getUserById = async (id) => {
    try {
        const user = await User.findById(id)
        // console.log(user)
        return user
    } catch (e) {
        throw e
    }
}

/**
 * Get user by email
 * - Fetch user object from Mongo using the "email" field and return user object
 * @param {string} email
 * @returns {Promise<User>}
 */
getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email })
        // console.log('us=>user',user)
        return user
    } catch (e) {
        throw e
    }
}
/**
 * Create user
 *  - check if the user with the email already exists using `User.isEmailTaken()` method
 *  - If so throw an error using the `ApiError` class. Pass two arguments to the constructor, //code,msg
 *    1. 200 OK status code using `http-status` library
 *    2. An error message, 'Email already taken'
 *  - Otherwise, create and return a new User object
 *
 * @param {Object} userBody
 * @returns {Promise<User>}
 * @throws {ApiError}
 *
 * userBody example:
 * {
 *  "name": "users",
 *  "email": "user@gmail.com",
 *  "password": "usersPasswordHashed"
 * }
 *
 * 200 status code on duplicate email - https://stackoverflow.com/a/53144807 
 */
createUser = async (userBody) => {
    try {
        const { name, email, password } = userBody
        if (!email) {
            throw new ApiError(400, "\"\"email\" email is required!")
        } if (!password) {
            throw new ApiError(400, "\"\"password\"\" password is required!")
        }
        if (await User.isEmailTaken(email)) {
            // console.log(userBody)
            throw new ApiError(200, "\"\"email\"\" email already exist")
        } else {
            console.log(name, email, password)
            const hashedPassword = await bcrypt.hash(userBody.password, 10)
            return await User.create({ ...userBody, password: hashedPassword })
        }
    } catch (e) {
        console.log(e)
        throw e
        // throw new ApiError(httpStatus.BAD_REQUEST,e)
    }
}


//}
module.exports = { getUserById, getUserByEmail, createUser, };
