const CustomAPIError = require("../Errors/custom-error");
const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;

const User = require("../Models/User");
const sendToken = require("../Utils/jwtToken");
const SendEmail = require("../Utils/SendEmail");

// User Registeration
const registerUser = async (req, res) => {
  const mycloud = await cloudinary.uploader.upload(req.body.avatar, {
    folder: "Ecommerce App Avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: mycloud.public_id, url: mycloud.secure_url },
  });

  sendToken(user, res, StatusCodes.CREATED);
};

// ------------------------------------------------------------------------------

// User Log In
const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomAPIError(
      "Invalid Email & Password",
      StatusCodes.UNAUTHORIZED
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new CustomAPIError(
      "Invalid Email & Password",
      StatusCodes.UNAUTHORIZED
    );
  }

  const isPasswordMatched = await user.comparePassword(password);
  // console.log(isPasswordMatched);

  if (!isPasswordMatched) {
    throw new CustomAPIError("Invalid Credentials", StatusCodes.UNAUTHORIZED);
  }

  sendToken(user, res, StatusCodes.OK);
};

// ------------------------------------------------------------------------------

// User Log OUT
const LogOutUser = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "Logged Out Successfully !!" });
};

// ------------------------------------------------------------------------------

// Forgot Password Send reset link through Email and setting password-reset-token
const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    throw new CustomAPIError("User not Found !!", StatusCodes.NOT_FOUND);
  }

  // Get Reset Password Token
  const resetToken = user.getResetPasswordToken(); // resetToken value(token) is generated but is not saved in user schema of the user

  await user.save({ validateBeforeSave: false }); // saving the generated password reset token to user DB

  const resetPasswordURL = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your Password reset Token is :- \n\n${resetPasswordURL}\n\nIf you have not requested this mail, Please ignore it.`;

  try {
    await SendEmail({
      email: user.email,
      subject: "E-shop Password Recovery",
      message,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: `email sent to ${user.email} successfully !!!`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new CustomAPIError(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

// ------------------------------------------------------------------------------

// Reseting Password by Entering new Password after forgot password Email
const resetPassword = async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new CustomAPIError(
        "Reset Password Token is Invalid or has been Expired...",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  if (req.body.resetPassword !== req.body.confirmPassword) {
    return next(
      new CustomAPIError("Passwords Does not Match", StatusCodes.BAD_REQUEST)
    );
  }

  user.password = req.body.resetPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, res, StatusCodes.OK);
};

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// get user details while user in login
const getUserDetails = async (req, res) => {
  const { id } = req.user;

  const user = await User.findById(id);

  res.status(StatusCodes.OK).json({ success: true, user });
};

// ------------------------------------------------------------------------------

// updating user password while user in login
const updateUserPassword = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.OldPassword);

  if (!isPasswordMatched) {
    throw new CustomAPIError(
      "Old Password is incorrect !!",
      StatusCodes.UNAUTHORIZED
    );
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new CustomAPIError("Passwords Does not Match", StatusCodes.BAD_REQUEST)
    );
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, res, StatusCodes.OK);
};

// ------------------------------------------------------------------------------

// updating user details while user in login
const updateUserDetails = async (req, res, next) => {
  // const { name, email } = req.body; // ADD AVATAR LATER .......

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.uploader.destroy(imageId);

    const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "Ecommerce App Avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(StatusCodes.CREATED).json({ success: true });
};

// ------------------------------------------------------------------------------

// get All User - ADMIN
const getAllUsers = async (req, res) => {
  const users = await User.find();

  res
    .status(StatusCodes.OK)
    .json({ success: true, nbHits: users.length, users });
};

// ------------------------------------------------------------------------------

// get Single User - ADMIN
const getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new CustomAPIError(
      `User does not exist with this id ${req.params.id} !!`,
      StatusCodes.NOT_FOUND
    );
  }

  res.status(StatusCodes.OK).json({ success: true, user });
};

// ------------------------------------------------------------------------------

// update user role -- ADMIN
const updateUserRole = async (req, res, next) => {
  const { name, email, role } = req.body;

  const newUserData = {
    name,
    email,
    role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) {
    throw new CustomAPIError(
      `User does not exist with this id ${req.params.id} !!`,
      StatusCodes.NOT_FOUND
    );
  }

  res.status(StatusCodes.CREATED).json({ success: true });
};

// ------------------------------------------------------------------------------

// delete User -- ADMIN
const deleteUser = async (req, res, next) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) {
    throw new CustomAPIError(
      `User does not exist with this id ${req.params.id} !!`,
      StatusCodes.NOT_FOUND
    );
  }

  res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: "User Deleted SuccessFully" });
};

module.exports = {
  registerUser,
  LoginUser,
  LogOutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserDetails,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
};
