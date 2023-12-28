// User Registration and Authentication
//    - Implement user model
//    - Implement user registration
//    - Implement user login

const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const { hashPassword, comparePassword } = require("../utils/bcrypt.util.js");
const { where } = require("sequelize");

async function register(req, res) {
  try {
    // Database already Unique
    // Add another layer to check if user with the same email already exist
    const userExist = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExist) {
      throw "User already exists";
    }

    // Create user using data from request body.
    // Request body must contain all required fields defined in User model.
    const hashedPassword = hashPassword(req.body.password);
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // Create verification token with email
    const token = jwt.sign(
      {
        email: user.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    console.log(token);

    // Send email sent message
    res.json({
      user
    });

    // Send created user as response.
    // res.json(user);
    // res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    // If there is any error, send error as response.
    res.status(500).json({ error: error });
  }
}

async function login(req, res) {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!email && !password) {
      // This will go to the catch block
      throw "Email and password are required";
    }

    const user = await User.findOne({
        where:{
            email: email
        }
    })

    if(!user) throw `User does not exist. Please sign up.`
    
    // Validate if user password
    const matchingPwd = comparePassword(password, user.password);

    if (!matchingPwd) throw "Invalid login credentials";

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role:user.role },
      process.env.SECRET_KEY,
      {
        // expiresIn: "2h",
        algorithm: "HS256",
      }
    );

    res.status(200).json({ accessToken: token, user: user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  register,
  login,
};
