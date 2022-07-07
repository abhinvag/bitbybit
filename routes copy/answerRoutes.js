const express = require("express");
const router = express.Router();

let Answer = require("../models/answer.model");

router.post("/new", function(req, res){
    const newAnswer = new Answer({
        id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        createdBy: req.body.createdBy,
        creatorId: req.body.creatorId,
        commentsId: req.body.id
    })
    Answer.insertMany(newAnswer, function(err){
        if(err){
            res.send(err);
        }
        else{
            res.send(newAnswer);
        }
    })
})

router.get('/get/:id', async function(req, res){
    await Answer.findOne({id: req.params.id}, function(err, found){
        if(err){
            res.send(err);
        }
        else if(found){
            res.send(found);
        }
    })
})

router.post('/updateVotes', async function(req, res){
    const answerId = req.body.answerId;

    await Answer.findOne({id: answerId}, function(err, found){
        if(found){
            const votes = found.votes + 1;
            found.updateOne({votes: votes}, function(err){
                if(err){
                    res.send(err);
                }
                else{
                    found.save(async (err, user) => {
                        if(err){
                            res.send(er);
                        }
                        else{
                            await Answer.findOne({id: answerId}, function(err, found){
                                if(found){
                                    res.send(found);
                                }
                            })
                        }
                    })
                }
            })
        }
        else{
            res.send(err);
        }
    })

})

module.exports = router;