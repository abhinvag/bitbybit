const express = require("express");
const router = express.Router();

let Comments = require("../models/comments.model");

router.post("/new", function(req, res){
    const newComments = new Comments({
        id: req.body.id,
        comments: []
    })
    Comments.insertMany(newComments, function(err){
        if(err){
            res.send(err);
        }
        else{
            res.send(newComments);
        }
    })
})

router.post("/newComment", function(req, res){
    answerId = req.body.answerId;
    const newComment = {
        id: req.body.id,
        author: req.body.author,
        authorId: req.body.authorId,
        comment: req.body.comment
    }
    Comments.findOne({id:answerId}, function(err, found){
        if(err) res.send(err);
        else if(found){
            let cs = found.comments;
            found.updateOne({comments: [...cs, newComment]}, function(err){
                if(err){
                    res.send(err);
                }
                else{
                    found.save((err, c) => {
                        if(err){
                            res.send(err);
                        }
                    })
                }
            })
        }
    })
})

router.get("/get/:id", async function(req, res){
    await Comments.findOne({id: req.params.id}, function(err, found){
        if(found){ 
            res.send(found);
        }
        else if(err){
            res.send(err);
        }
    })
})

router.post("/delete", async (req, res) => {
    await Comments.findOne({id: req.body.answerId}, async function(err, found){
        if(found){
            var comments = found.comments;
            for(var i=0;i<comments.length;i++){
                if(comments[i].id === req.body.id){
                    comments.splice(i,1);
                    break;
                }
            }
            await found.updateOne({comments: comments}, function(err){
                if(err) res.send(err);
                else{
                    found.save(async (err, c)=>{
                        if(err) res.send(err);
                        else{
                            await Comments.findOne({id: req.body.answerId}, function(err, found){
                                if(found){ 
                                    res.send(found);
                                }
                                else if(err){
                                    res.send(err);
                                }
                            })
                        }
                    })
                }
            })
        }else if(err){
            res.send(err);
        }
    })
})

module.exports = router;