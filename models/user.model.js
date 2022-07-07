const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  imgURL: {
    type: String,
  },
  links: {
    type: Object,
  },
  points: {
    type: Number,
    default: 0.0,
  },
  savedQuestions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  solvedQuestions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  postedQuestions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  postedAnswers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
  likedAnswers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
