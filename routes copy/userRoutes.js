const express = require("express");
const router = express.Router();

let User = require("../models/user.model");
const { route } = require("./answerRoutes");

router.get("/get/:id", async function (req, res) {
  await User.findOne({ googleId: req.params.id }, function (err, found) {
    if (err) {
      res.send(err);
    } else if (found) {
      res.status(200).send(found);
    }
  });
});

router.post("/auth", async function (req, res) {
  console.log(req.body);
  const id = req.body.googleId;
  await User.findOne({ googleId: id }, function (err, found) {
    if (found) {
      res.send(found);
    } else if (err) console.log(err);
    else {
      const newUser = new User({
        googleId: id,
        name: req.body.name,
        email: req.body.email,
        imgURL: req.body.imageUrl,
      });
      User.insertMany(newUser, function (err) {
        if (err) {
          res.send(err);
        } else {
          res.send(newUser);
        }
      });
    }
  });
});

router.post("/updateQuestionList", async function (req, res) {
  try {
    const id = req.body.googleId;
    const questionId = req.body.questionId;
    const listType = req.body.listType;
    if (listType == "posted") {
      await User.updateOne(
        { googleId: id },
        { $push: { postedQuestions: [questionId] } },
        (err, result) => {
          if (!err) {
            res.status(200).send(result);
          } else res.status(400).send(err);
        }
      );
    } else if (listType == "saved") {
      await User.updateOne(
        { googleId: id },
        { $push: { savedQuestions: [questionId] } },
        (err, result) => {
          if (!err) {
            res.status(200).send(result);
          } else res.status(400).send(err);
        }
      );
    } else if (listType == "solved") {
      await User.updateOne(
        { googleId: id },
        { $push: { solvedQuestions: [questionId] } },
        (err, result) => {
          if (!err) {
            res.status(200).send(result);
          } else res.status(400).send(err);
        }
      );
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/updateAnswerList", async function (req, res) {
  const id = req.body.googleId;
  const answerId = req.body.answerId;
  await User.findOne({ googleId: id }, function (err, found) {
    if (found) {
      const ids = found.answers;
      found.updateOne({ answers: [...ids, answerId] }, function (err) {
        if (err) {
          res.send(err);
        } else {
          found.save(async (err, user) => {
            if (err) {
              res.send(er);
            } else {
              await User.findOne({ googleId: id }, function (err, found) {
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

router.post("/updateLikedAnswerList", async function (req, res) {
  const userId = req.body.googleId;
  const answerId = req.body.answerId;

  await User.findOne({ googleId: userId }, function (err, found) {
    if (found) {
      const ids = found.likedAnswers;
      found.updateOne({ likedAnswers: [...ids, answerId] }, function (err) {
        if (err) {
          res.send(err);
        } else {
          found.save(async (err, user) => {
            if (err) {
              res.send(er);
            } else {
              await User.findOne({ googleId: userId }, function (err, found) {
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

router.post("/updatePoints", async function (req, res) {
  const userId = req.body.creatorId;

  await User.findOne({ googleId: userId }, function (err, found) {
    if (found) {
      const points = found.points + 1;
      found.updateOne({ points: points }, function (err) {
        if (err) {
          res.send(err);
        } else {
          found.save(async (err, user) => {
            if (err) {
              res.send(er);
            } else {
              res.send("successfull");
            }
          });
        }
      });
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
