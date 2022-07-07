let User = require("../models/user.model");

const service = module.exports;

service.get = async (query, params, body) => {
  try {
    const res = await User.findOne({ googleId: params.id })
      .populate("savedQuestions")
      .populate("solvedQuestions")
      .populate("postedQuestions")
      .populate("postedAnswers")
      .populate("likedAnswers");
    console.log(res);
    if (res == null) return "404";
    else return res;
  } catch (err) {
    throw err;
  }
};

service.auth = async (query, params, body) => {
  try {
    const id = body.googleId;
    let res = await User.findOne({ googleId: id })
      .populate("savedQuestions")
      .populate("solvedQuestions")
      .populate("postedQuestions")
      .populate("postedAnswers")
      .populate("likedAnswers");
    if (!res) {
      const newUser = new User({
        googleId: id,
        name: body.name,
        email: body.email,
        imgURL: body.imageUrl,
        links: {
          1: {
            site: "mail",
            link: `mailto:${body.email}`,
          },
        },
      });
      res = await User.create(newUser);
    }
    return res;
  } catch (err) {
    throw err;
  }
};

service.updateQuestionList = async (query, params, body) => {
  try {
    const id = body.googleId;
    const questionId = body.questionId;
    const listType = body.listType;
    let res;
    if (listType == "posted") {
      res = await User.findOneAndUpdate(
        { googleId: id },
        { $push: { postedQuestions: [questionId] } },
        { new: true }
      )
        .populate("savedQuestions")
        .populate("solvedQuestions")
        .populate("postedQuestions")
        .populate("postedAnswers")
        .populate("likedAnswers");
    } else if (listType == "saved") {
      res = await User.findOneAndUpdate(
        { googleId: id },
        { $push: { savedQuestions: [questionId] } },
        { new: true }
      )
        .populate("savedQuestions")
        .populate("solvedQuestions")
        .populate("postedQuestions")
        .populate("postedAnswers")
        .populate("likedAnswers");
    } else if (listType == "solved") {
      res = await User.findOneAndUpdate(
        { googleId: id },
        { $push: { solvedQuestions: [questionId] } },
        { new: true }
      )
        .populate("savedQuestions")
        .populate("solvedQuestions")
        .populate("postedQuestions")
        .populate("postedAnswers")
        .populate("likedAnswers");
    }
    return res;
  } catch (err) {
    throw err;
  }
};

service.deleteFromQuestionList = async (query, params, body) => {
  try {
    const id = body.googleId;
    const questionId = body.questionId;
    const listType = body.listType;
    let res;
    if (listType == "posted") {
      res = await User.findOneAndUpdate(
        { googleId: id },
        { $pull: { postedQuestions: questionId } },
        { new: true }
      )
        .populate("savedQuestions")
        .populate("solvedQuestions")
        .populate("postedQuestions")
        .populate("postedAnswers")
        .populate("likedAnswers");
    } else if (listType == "saved") {
      res = await User.findOneAndUpdate(
        { googleId: id },
        { $pull: { savedQuestions: questionId } },
        { new: true }
      )
        .populate("savedQuestions")
        .populate("solvedQuestions")
        .populate("postedQuestions")
        .populate("postedAnswers")
        .populate("likedAnswers");
    } else if (listType == "solved") {
      res = await User.findOneAndUpdate(
        { googleId: id },
        { $pull: { solvedQuestions: questionId } },
        { new: true }
      )
        .populate("savedQuestions")
        .populate("solvedQuestions")
        .populate("postedQuestions")
        .populate("postedAnswers")
        .populate("likedAnswers");
    }
    return res;
  } catch (err) {
    throw err;
  }
};

service.updateAnswerList = async (query, params, body) => {
  try {
    const id = body.googleId;
    const answerId = body.answerId;
    const listType = body.listType;
    let res;
    console.log(body);
    if (listType == "posted") {
      res = await User.findOneAndUpdate(
        { googleId: id },
        { $push: { postedAnswers: [answerId] } },
        { new: true }
      )
        .populate("savedQuestions")
        .populate("solvedQuestions")
        .populate("postedQuestions")
        .populate("postedAnswers")
        .populate("likedAnswers");
    } else if (listType == "liked") {
      res = await User.findOneAndUpdate(
        { googleId: id },
        { $push: { likedAnswers: [answerId] } },
        { new: true }
      )
        .populate("savedQuestions")
        .populate("solvedQuestions")
        .populate("postedQuestions")
        .populate("postedAnswers")
        .populate("likedAnswers");
    }
    return res;
  } catch (err) {
    throw err;
  }
};

service.deleteFromAnswerList = async (query, params, body) => {
  try {
    const id = body.googleId;
    const answerId = body.answerId;
    const listType = body.listType;
    let res;
    console.log(body);
    if (listType == "posted") {
      res = await User.findOneAndUpdate(
        { googleId: id },
        { $pull: { postedAnswers: answerId } },
        { new: true }
      )
        .populate("savedQuestions")
        .populate("solvedQuestions")
        .populate("postedQuestions")
        .populate("postedAnswers")
        .populate("likedAnswers");
    } else if (listType == "liked") {
      res = await User.findOneAndUpdate(
        { googleId: id },
        { $pull: { likedAnswers: answerId } },
        { new: true }
      )
        .populate("savedQuestions")
        .populate("solvedQuestions")
        .populate("postedQuestions")
        .populate("postedAnswers")
        .populate("likedAnswers");
    }
    return res;
  } catch (err) {
    throw err;
  }
};

service.updatePoints = async (query, params, body) => {
  try {
    const id = body.googleId;
    if (body.type == "upvote") {
      const res = await User.findOneAndUpdate(
        { googleId: id },
        { $inc: { points: 1 } },
        { new: true }
      )
        .populate("savedQuestions")
        .populate("solvedQuestions")
        .populate("postedQuestions")
        .populate("postedAnswers")
        .populate("likedAnswers");
      return res;
    } else if (body.type == "downvote") {
      const res = await User.findOneAndUpdate(
        { googleId: id },
        { $inc: { points: -1 } },
        { new: true }
      )
        .populate("savedQuestions")
        .populate("solvedQuestions")
        .populate("postedQuestions")
        .populate("postedAnswers")
        .populate("likedAnswers");
      return res;
    }
  } catch (err) {
    throw err;
  }
};

service.updateLinks = async (query, params, body) => {
  try {
    const id = body.googleId;
    const res = await User.findOneAndUpdate(
      { googleId: id },
      { links: body.links },
      { new: true }
    )
      .populate("savedQuestions")
      .populate("solvedQuestions")
      .populate("postedQuestions")
      .populate("postedAnswers")
      .populate("likedAnswers");
    return res;
  } catch (err) {
    throw err;
  }
};

service.isLikedByUser = async (id, answerId) => {
  try {
    const user = await User.findById(id);
    var flag = false;
    for (var i = 0; i < user.likedAnswers.length; i++) {
      if (user.likedAnswers[i].toString() === answerId.toString()) {
        flag = true;
        break;
      }
    }
    return flag;
  } catch (err) {
    throw err;
  }
};
