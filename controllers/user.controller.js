const { handleInternalError } = require("../utility/errorHandler");
const userService = require("../services/user.service");

const controller = module.exports;

controller.get = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await userService.get(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "User get");
  }
};

controller.auth = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await userService.auth(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "User auth");
  }
};

controller.updateQuestionList = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await userService.updateQuestionList(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "User updateQuestionList");
  }
};

controller.deleteFromQuestionList = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await userService.deleteFromQuestionList(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "User deleteFromQuestionList");
  }
};

controller.updateAnswerList = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await userService.updateAnswerList(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "User updateAnswerList");
  }
};

controller.updatePoints = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await userService.updatePoints(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "User updatePoints");
  }
};

controller.updateLinks = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await userService.updateLinks(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "User updateLinks");
  }
};
