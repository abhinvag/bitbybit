const express = require("express");
const router = express.Router();

const answerController = require("../controllers/answer.controller");

router.get("/get", answerController.get);
router.post("/new", answerController.new);
router.post("/delete", answerController.delete);
router.post("/update", answerController.update);
router.post("/updateVotes", answerController.updateVotes);

module.exports = router;
