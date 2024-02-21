import mongoose from "mongoose";

const userDetailSchema = new mongoose.Schema({
  follower: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
  ],

  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
  ],

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bio: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  savedpost: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const UserDetail =
  mongoose.models.userdetail || mongoose.model("userdetail", userDetailSchema);

export { UserDetail };
