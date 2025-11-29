import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import userSchema from "../models/userSchema.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('decoded',decoded)
      req.user = await userSchema.findById(decoded.id).select("-password");
      console.log('requser',req.user)
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
};

export const adminOnly = (req, res, next) => {
  console.log('req.user')
  console.log('req.user',req.user)
  if (req.user && req.user.role === "admin"){
     next();
    } 
  else res.status(403).json({ message: "Access denied, admin only" });
};
