const Answer = require("../models/answer.model");
const commentService = require("./comments.service");
const userService = require("./user.service");
const questionService = require("./question.service");

const service = module.exports;

service.new = async (query, params, body) => {
  try {
    const commentsId = await commentService.new({}, {}, {});

    const newAnswer = new Answer({
      title: body.title,
      content: body.content,
      createdBy: body.createdBy,
      comments: commentsId._id,
    });

    const res = await Answer.create(newAnswer);

    const userServiceBody = {
      googleId: body.googleId,
      answerId: res._id,
      listType: "posted",
    };

    const res2 = await userService.updateAnswerList({}, {}, userServiceBody);

    const questionServiceBody = {
      qid: body.qid,
      answerId: res._id,
    };

    const res3 = await questionService.updateAnswerList(
      {},
      {},
      questionServiceBody
    );

    return res;
  } catch (err) {
    throw err;
  }
};

service.update = async (query, params, body) => {
  try {
    const res = await Answer.findOneAndUpdate(
      { _id: body._id },
      {
        $set: {
          title: body.title,
          content: body.content,
        },
      }
    );
    return res;
  } catch (err) {
    throw err;
  }
};

service.delete = async (query, params, body) => {
  try {
    const res = await Answer.deleteOne({ _id: body._id });
    return res;
  } catch (err) {
    throw err;
  }
};

service.get = async (query, params, body) => {
  try {
    var res = await Answer.findById(query.questionId).populate("createdBy");
    var res1 = {
      res: res,
      isLikedByUser: false,
    };
    if (query.userId != undefined) {
      const temp = await userService.isLikedByUser(query.userId, res._id);
      console.log(temp);
      res1.isLikedByUser = temp;
      //console.log(res1);
    }
    return res1;
  } catch (err) {
    throw err;
  }
};

service.updateVotes = async (query, params, body) => {
  try {
    const answerId = body.answerId;
    console.log(answerId);
    if (body.type == "upvote") {
      const res = await Answer.findOneAndUpdate(
        { _id: answerId },
        { $inc: { votes: 1 } },
        { new: true }
      ).populate("createdBy");
      const res2 = await userService.updatePoints(
        {},
        {},
        { googleId: body.googleId, type: body.type }
      );
      const res3 = await userService.updateAnswerList(
        {},
        {},
        { googleId: body.googleId, answerId: answerId, listType: "liked" }
      );
      console.log(res3);
      return res;
    } else if (body.type == "downvote") {
      const res = await Answer.findOneAndUpdate(
        { _id: answerId },
        { $inc: { votes: -1 } },
        { new: true }
      ).populate("createdBy");
      const res2 = await userService.updatePoints(
        {},
        {},
        { googleId: body.googleId, type: body.type }
      );
      const res3 = await userService.deleteFromAnswerList(
        {},
        {},
        { googleId: body.googleId, answerId: answerId, listType: "liked" }
      );
      return res;
    }
  } catch (err) {
    throw err;
  }
};
