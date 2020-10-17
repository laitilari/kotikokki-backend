const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide your email for account recovery."],
    unique: [true, "This email has already been registered."],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minlength: [4, "Password must be minimum 4 characters."],
    select: false,
  },
  name: {
    type: String,
    required: [true, "Please provide your name for customers."],
    minlength: [3, "Name needs to be at least 3 characters."],
  },
  intro: {
    type: String,
    default: "No introduction yet.",
  },
  phone: {
    type: String,
    default: "No contact info yet.",
  },
  isChef:{
    type:Boolean,
    default:false
  },
  dishes: {
    type: Array,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  canditatePassword,
  userPassword
) {
  return await bcrypt.compare(canditatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
