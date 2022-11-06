import jwt from "jsonwebtoken";
import user from "../models/userModel";

const isAuth = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(process.env.JWT_SECRET, token);
      req.user = await user.findByPk(decoded.id);
      if (!req.user) {
        throw "user not found";
      }
      next();
    }
  } catch (error) {
    console.error(error);
    if (error === "user not found") {
      res.status(404).json({
        success: false,
        error: error,
      });
    } else {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  }
};

export default isAuth;
