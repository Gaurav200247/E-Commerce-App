const { StatusCodes } = require("http-status-codes");

const errHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong !!, Please try again later.",
  };

  // if email entered is not unique for registeration
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, Please choose another value`;
    customError.statusCode = 400;
  }

  // if some values are not sent to server during request. like : password or email
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = 400;
  }

  // if id is not valid
  if (err.name === "CastError") {
    customError.msg = `No Item Found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  // Wrong JWT Error
  if (err.name === "TokenExpiredError") {
    customError.msg = `json web token is invalid | try again !!`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errHandlerMiddleware;
