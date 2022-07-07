import React, {useEffect} from 'react'
import {useSelector} from 'react-redux';
import AnswerBadge from './AnswerBadge';
import "../styles/answerDisplay.css"

function AnswersDisplay() {

    const question = useSelector(state => state.question)

    const answers = question.answers;

    useEffect(() => {
        answers.sort((a,b) => b.votes-a.votes);
    }, [])

    if(answers.length === 0){
        return(
            <div className="answer-display-div">
                <h1 className="no-answers">Sorry, no answers yet    <i className="far fa-frown"></i></h1>
            </div>
        )
    }
    else{
        return (
            <div className="answer-display-div make-white">
                {answers.map((answer) => (
                    <AnswerBadge
                        key = {answer.id}
                        id = {answer._id}
                        title = {answer.title}
                        createdBy = {answer.createdBy.name}
                        imgURL = {answer.createdBy.imgURL}
                        votes = {answer.votes}
                        profile={false}
                    />
                ))}
            </div>
        )
    }

}

export default AnswersDisplay
