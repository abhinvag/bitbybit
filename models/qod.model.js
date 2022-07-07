const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const qodSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
});

const QOD = mongoose.model("QOD", qodSchema);

module.exports = QOD;
