const sendToken = (user, res, statusCode) => {
  const userToken = user.getJWTtoken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_LIFETIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  return res.status(statusCode).cookie("token", userToken, options).json({
    success: true,
    user,
    userToken,
  });
};

module.exports = sendToken;
