const express = require("express");
const router = express.Router();

const questionController = require("../controllers/question.controller");

router.get("/getQuestionList", questionController.getQuestionList);
router.get("/getQuestion/:id", questionController.getQuestion);
router.get("/qod", questionController.qod);
router.post("/getQuestionList", questionController.getQuestionList);
router.post("/new", questionController.new);
router.post("/update", questionController.update);
router.post("/updateAnswerList", questionController.updateAnswerList);

module.exports = router;
