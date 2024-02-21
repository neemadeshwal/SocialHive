import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
    },
    url: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
      },
    ],
    comment: [
      {
        commentby: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
        },
        commenttime: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    tagged: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.post || mongoose.model("post", postSchema);

export { Post };
