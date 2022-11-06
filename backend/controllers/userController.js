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

    const userExists = await User.findOne({
      where: { email },
    });

    if (userExists) {
      throw "user exists";
    }

    const user = await User.create({
      email,
      password,
      name,
    });

    console.log("user====>", user);

    if (!user) {
      throw "user could not be created";
    } else {
      res.status(201).json({
        success: true,
        token: generateToken(user.id),
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

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        token: generateToken(user.id),
      });
    } else {
      throw "invalid credentials";
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};

export { registerUser, loginUser };
