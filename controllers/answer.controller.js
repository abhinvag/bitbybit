const { handleInternalError } = require("../utility/errorHandler");
const answerService = require("../services/answer.service");

const controller = module.exports;

controller.new = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await answerService.new(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "Answer new");
  }
};

controller.update = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await answerService.update(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "Answer update");
  }
};

controller.delete = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await answerService.delete(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "Answer delete");
  }
};

controller.get = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await answerService.get(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "Answer get");
  }
};

controller.updateVotes = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await answerService.updateVotes(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "Answer updateVotes");
  }
};
