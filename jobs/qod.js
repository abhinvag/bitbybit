const scheduler = require("node-schedule");
const Question = require("../models/question.model");
const QOD = require("../models/qod.model");
//const connectDB = require("../config/db");

const selectQOD = async () => {
  //connectDB();
  const questionList = await Question.find({});
  const idx = Math.floor(Math.random() * questionList.length);
  await QOD.remove({});
  const newQod = new QOD({
    id: questionList[idx]._id,
  });
  newQod.save((err) => {
    if (err) console.log(err), process.exit(1);
    else console.log("Success"), process.exit(0);
  });
};

const jobScheduler = () => {
  scheduler.scheduleJob("0 1 * * *", selectQOD);
};

module.exports = jobScheduler;
