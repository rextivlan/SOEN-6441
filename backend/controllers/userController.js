import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      throw "enter all fields";
    }

    console.log(email, password, name);

    const userExists = await User.getByEmail(email);
    console.log(userExists);
    if (userExists.length !== 0) {
      throw "user exists";
    }

    const user = await User.create(name, email, password);

    console.log("user====>", user);

    if (!user) {
      throw "user could not be created";
    } else {
      res.status(201).json({
        success: true,
        token: generateToken(user.user_id),
      });
    }
  } catch (error) {
    console.log(error);

    if (error === "enter all fields") {
      res.status(400).json({
        success: false,
        error,
      });
    } else if (error === "user already exists") {
      res.status(400).json({
        success: false,
        error,
      });
    } else {
      res.status(500).json({
        success: false,
        error,
      });
    }
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw "enter all fields";
    }

    const user = await User.getByEmailAndPassword(email, password);
    if (user.length === 0) {
      throw "email and password does not match";
    }
    res.status(200).json({
      success: true,
      token: generateToken(user[0].user_id),
      user_id: user[0].user_id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};

export { registerUser, loginUser };
