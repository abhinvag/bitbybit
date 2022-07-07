const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const answerSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  votes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: "Comments",
  },
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
