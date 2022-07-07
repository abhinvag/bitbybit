import React from 'react'
import parse from "html-react-parser"
import {Button, Container, Col, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import "../styles/answerBadge.css"


function AnswerBadge({id, title, createdBy, imgURL, votes}) {

    return (
        <div className="answer-badge-div">
            <img src={imgURL} alt="user" />
            <div className="answer-badge-div-trio">
                <div className="answer-badge-div-title">
                    {parse(title)}
                </div>
                <p className="answer-badge-div-votes">Total Votes: {votes}</p>
                <p className="answer-badge-div-createdBy">Author: {createdBy}</p>
            </div>
            <Link to={`/answer/${id}`}>  
                <Button
                    variant="outline-dark"
                    className="answer-badge-div-button customButton-outline"
                >
                    View Post
                </Button>
            </Link>
        </div>
    )
}

export default AnswerBadge
