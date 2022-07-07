const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/get/:id", userController.get);
router.post("/auth", userController.auth);
router.post("/updateQuestionList", userController.updateQuestionList);
router.post("/deleteFromQuestionList", userController.deleteFromQuestionList);
router.post("/updateAnswerList", userController.updateAnswerList);
router.post("/updatePoints", userController.updatePoints);
router.post("/updateLinks", userController.updateLinks);

module.exports = router;
