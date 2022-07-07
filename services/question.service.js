const Question = require("../models/question.model");
const QOD = require("../models/qod.model");
const answerService = require("./answer.service");

const service = module.exports;

service.getQuestionList = async (query, params, body) => {
  try {
    const questions = await Question.find({});
    return questions;
  } catch (err) {
    throw err;
  }
};

service.getQuestion = async (query, params, body) => {
  try {
    let res = await Question.findById(params.id);
    let answerList = [];
    for (var i = 0; i < res.answers.length; i++) {
      const answer = await answerService.get(
        { questionId: res.answers[i] },
        {},
        {}
      );
      //console.log(answer);
      if (answer.res !== null) {
        answerList.push(answer.res);
      }
    }
    res.answers = answerList;
    console.log(res);
    return res;
  } catch (err) {
    throw err;
  }
};

service.new = async (query, params, body) => {
  try {
    const newQuestion = new Question({
      name: body.Name,
      link: body.Link,
    });
    const res = await Question.create(newQuestion);
    return res;
  } catch (err) {
    throw err;
  }
};

service.update = async (query, params, body) => {
  try {
    const res = await Question.findOneAndUpdate(
      { _id: body._id },
      {
        $set: {
          name: body.Name,
          link: body.Link,
        },
      }
    );
    return res;
  } catch (err) {
    throw err;
  }
};

service.updateAnswerList = async (query, params, body) => {
  try {
    const id = body.qid;
    const answerId = body.answerId;
    const res = await Question.findOneAndUpdate(
      { _id: id },
      { $push: { answers: [answerId] } }
    );
    return res;
  } catch (err) {
    throw err;
  }
};

// Question of Day Routes

service.qod = async (query, params, body) => {
  try {
    const res = await QOD.find({}).populate("id");
    return res;
  } catch (err) {
    throw err;
  }
};
