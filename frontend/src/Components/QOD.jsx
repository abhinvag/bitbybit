import React, {useState, useEffect} from 'react'
import "../styles/qod.css"
import axios from "axios";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

function QOD() {

    const [question, setQuestion] = useState({
        id: {
            name: "",
            _id: "",
            link: ""
        }
    });

    useEffect(() => {
        const fetch = async () => {
            const qod = await axios.get("/question/qod");
            setQuestion(qod.data[0]);
        }
        fetch();
    }, [])
    

    return (
        <div className='qod-container'>
            <h1 className='qod-container-heading'>Question of the Day</h1>
            <div className='qod-question-container'>
                <h1 className='qod-question-container-name'>{question.id.name}</h1>
                <div className='qod-buttons-div'>
                    <a href={question.id.link}>
                        <Button className="customButton">Solve</Button>
                    </a>
                    <Link to={`/question/${question.id._id}`}>
                        <Button className="customButton">Discuss</Button>
                    </Link>
                </div>
            </div>
            
        </div>
    )
}

export default QOD