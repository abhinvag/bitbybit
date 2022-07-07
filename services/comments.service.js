let Comments = require("../models/comments.model");

const service = module.exports;

service.new = async (query, params, body) => {
  try {
    const newComments = new Comments({
      comments: [],
    });
    const res = await Comments.create(newComments);

    return res;
  } catch (err) {
    throw err;
  }
};

service.newComment = async (query, params, body) => {
  try {
    const newComment = {
      id: body.id,
      author: body.author,
      authorId: body.authorId,
      comment: body.comment,
    };
    const res = await Comments.findOneAndUpdate(
      { _id: body.commentsId },
      { $push: { comments: [newComment] } },
      { new: true }
    );
    return res;
  } catch (err) {
    throw err;
  }
};

service.get = async (query, params, body) => {
  try {
    const res = await Comments.findById(params.id);
    return res;
  } catch (err) {
    throw err;
  }
};

service.delete = async (query, params, body) => {
  try {
    //console.log(body);
    const res = await Comments.findOneAndUpdate(
      { _id: body.commentsId },
      {
        $pull: {
          comments: {
            id: body.id,
          },
        },
      },
      { new: true }
    );
    return res;
  } catch (err) {
    throw err;
  }
};

service.update = async (query, params, body) => {
  try {
    //console.log(body);
    const res = await Comments.findOneAndUpdate(
      { _id: body.commentsId, "comments.id": body.id },
      {
        $set: {
          "comments.$.comment": body.comment,
        },
      },
      { new: true }
    );
    return res;
  } catch (err) {
    throw err;
  }
};
