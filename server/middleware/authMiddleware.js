import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import expressAsyncHandler from "express-async-handler";
const protect = expressAsyncHandler(async (req, res, next) => {
  let token = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      // console.log("decoded", decoded);
      // console.log("token", token);
      next();
    } catch (err) {
      //   console.log(err);
      res.status(401);
      throw new Error("Not Authorized , Invalid Token");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("No Token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as an Admin");
  }
};
export { protect, admin };
