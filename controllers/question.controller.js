const { handleInternalError } = require("../utility/errorHandler");
const questionService = require("../services/question.service");

const controller = module.exports;

controller.getQuestionList = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await questionService.getQuestionList(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "Question getQuestionList");
  }
};

controller.getQuestion = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await questionService.getQuestion(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "Question getQuestion");
  }
};

controller.new = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await questionService.new(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "Question new");
  }
};

controller.update = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await questionService.update(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "Question update");
  }
};

controller.updateAnswerList = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await questionService.updateAnswerList(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "Question updateAnswerList");
  }
};

controller.qod = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await questionService.qod(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "Question qod");
  }
};
