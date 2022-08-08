const CustomAPIError = require("../Errors/custom-error");
const JWT = require("jsonwebtoken");
const User = require("../Models/User");
const { StatusCodes } = require("http-status-codes");

const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new CustomAPIError("Please Login to Access this Route...");
  }

  //   console.log(token);

  const decoded = JWT.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  //   console.log(decoded);

  //   console.log(req.user);

  next();
};

const authRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new CustomAPIError(
          "This User is Not Allowed to Access this Route",
          StatusCodes.UNAUTHORIZED
        )
      );
    }
    next();
  };
};

module.exports = { authMiddleware, authRoles };
