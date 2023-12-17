const sendToken = (user, res, statusCode) => {
  const userToken = user.getJWTtoken();

  const options = {
    maxAge: process.env.COOKIE_LIFETIME * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  };

  return res.status(statusCode).cookie("token", userToken, options).json({
    success: true,
    user,
    userToken,
  });
};

module.exports = sendToken;
