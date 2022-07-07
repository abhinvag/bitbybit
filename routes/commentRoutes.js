const express = require("express");
const router = express.Router();

const commentsController = require("../controllers/comments.controller");

router.get("/get/:id", commentsController.get);
router.post("/new", commentsController.new);
router.post("/newComment", commentsController.newComment);
router.post("/delete", commentsController.delete);
router.post("/update", commentsController.update);

module.exports = router;
