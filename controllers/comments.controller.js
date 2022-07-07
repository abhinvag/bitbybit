const { handleInternalError } = require("../utility/errorHandler");
const commentsService = require("../services/comments.service");

const controller = module.exports;

controller.new = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await commentsService.new(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "Comments new");
  }
};

controller.newComment = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await commentsService.newComment(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "Comments newComment");
  }
};

controller.get = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await commentsService.get(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "Comments get");
  }
};

controller.delete = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await commentsService.delete(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "Comments delete");
  }
};

controller.update = async (req, res) => {
  try {
    const { query, params, body } = req;
    const data = await commentsService.update(query, params, body);
    return res.status(200).send(data);
  } catch (err) {
    handleInternalError(req, res, err, "Comments update");
  }
};
