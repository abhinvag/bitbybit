const express = require("express");
const router = express.Router();

let Question = require("../models/question.model");
let QOD = require("../models/qod.model");

router.get("/getQuestionList", async function (req, res) {
  try {
    const questions = await Question.find({});
    res.status(200).json(questions);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/getQuestion/:id", async function (req, res) {
  try {
    Question.findById(req.params.id)
      .populate("answers")
      .then((found) => {
        res.status(200).send(found);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/new", function (req, res) {
  try {
    //console.log(req.body);
    const newQuestion = new Question({
      name: req.body.Name,
      link: req.body.Link,
    });
    Question.create(newQuestion, function (err, question) {
      if (!err) {
        res.status(200).send(question);
      } else {
        console.log(err);
        res.status(400).send(err);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/updateAnswerList", async function (req, res) {
  const id = req.body.qid;
  const answerId = req.body.answerId;
  await Question.findOne({ id: id }, function (err, found) {
    if (found) {
      const ids = found.answers;
      found.updateOne({ answers: [...ids, answerId] }, function (err) {
        if (err) {
          res.send(err);
        } else {
          found.save(async (err, question) => {
            if (err) {
              res.send(er);
            } else {
              await Question.findOne({ id: id }, function (err, found) {
                if (found) {
                  res.send(found);
                }
              });
            }
          });
        }
      });
    } else if (err) {
      res.send(err);
    }
  });
});

router.post("/updateVotes", async function (req, res) {
  const qid = req.body.qid;
  const aid = req.body.aid;
  await Question.findOne({ id: qid }, function (err, found) {
    if (found) {
      const answers = found.answers;
      for (var i = 0; i < answers.length; i++) {
        if (answers[i].id === aid) {
          answers[i].votes++;
          break;
        }
      }
      found.updateOne({ answers: answers }, function (err) {
        if (err) {
          res.send(err);
        } else {
          found.save(async (err) => {
            if (err) {
              res.send(err);
            } else {
              await Question.findOne({ id: qid }, function (err, found) {
                if (found) {
                  res.send(found);
                }
              });
            }
          });
        }
      });
    } else {
      res.send(err);
    }
  });
});

// Question of Day Routes

router.get("/qod", async (req, res) => {
  QOD.find({})
    .populate("id")
    .then((found) => {
      res.status(200).json(found);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
