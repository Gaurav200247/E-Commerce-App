const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const JWT = require("jsonwebtoken");
const crypto = require("crypto"); // in-built module

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter User Name"],
      maxlength: [30, "Cannot Exceed 30 Characters"],
      minlength: [5, "Name Should have more than 5 Characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a Valide Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Password"],
      minlength: [8, "Password Should be more than 8 Characters"],
      select: false,
    },
    avatar: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Password Hashing
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcryptjs.hash(this.password, 10);
});

// JWT Token Generator
UserSchema.methods.getJWTtoken = function () {
  return JWT.sign({ id: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

// Comparing Password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  const isMatch = await bcryptjs.compare(enteredPassword, this.password);
  return isMatch;
};

// Generate Reset Password token
UserSchema.methods.getResetPasswordToken = function () {
  //Generates cryptographically strong pseudorandom data. The size argument is a number indicating the number of bytes to generate.
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Creates and returns a Hash object that can be used to generate hash digests using the given algorithm.
  // const tokenCrypto = crypto
  //   .createHash("sha256")
  //   .update(resetToken)
  //   .digest("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
