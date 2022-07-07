const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    unique: true,
  },
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
