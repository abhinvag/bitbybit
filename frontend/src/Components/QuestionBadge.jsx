import React from 'react';
import { Link } from "react-router-dom"
import "../styles/questionBadge.css"
import { Container, Row, Col } from 'react-bootstrap'

function QuestionBadge({ name, id}) {

    return (
        <div className="question-badge-div">
            <Link to={`/question/${id}`} className="question-badge-link">
                <p className="question-badge-name">
                    {name}
                </p>
            </Link>
        </div>
    )
}

export default QuestionBadge
