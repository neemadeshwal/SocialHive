import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    minLength: 4,
    maxLength: 30,
    unique: true,
  },
  firstname: {
    type: String,
    required: [true, "Please provide your name"],
    minLength: 4,
    maxLength: 30,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  ProfilePhotoName: {
    type: String,
  },
  ProfilePhotoUrl: {
    type: String,
  },
  showProfilePhoto: {
    type: Boolean,
    default: false,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: Boolean,
  forgotPasswordTokenExpiry: Date,
  verifyToken: Boolean,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.user || mongoose.model("user", userSchema);

export { User };
