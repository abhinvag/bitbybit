import React, { useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import "../styles/questionDisplay.css";
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import {BiEdit} from "react-icons/bi";
import {BsSave2} from "react-icons/bs"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { setUser } from "../actions/index"
import NewQuestion from "../pages/NewQuestion";

const QuestionDisplay = ({isAuthor, isSaved, setIsSaved}) => {

    const question = useSelector(state => state.question)
    const [redirect, setredirect] = useState(false)
    const dispatch = useDispatch();

    const loggedIn = useSelector(state => state.user).token;
    const user = useSelector(state => state.user).result;

    if (redirect) {
        return <Redirect to="/newPost/false" />
    }

    const onSaveAction = async (action)  => {
        if(!loggedIn){
            toast.error("Login to save !!");
        }
        else{
            const obj = {   
                googleId: user.googleId, 
                questionId: question._id, 
                listType: "saved"
            }
            if(action == "save"){
                const res = await axios.post("/user/updateQuestionList", obj);
                dispatch(setUser({token:loggedIn, result:res.data}));
                setIsSaved(true);
                console.log(res.data);
            }
            else if(action == "unsave"){
                const res = await axios.post("/user/deleteFromQuestionList", obj);
                dispatch(setUser({token:loggedIn, result:res.data}));
                setIsSaved(false);
                console.log(res.data);
            }
        }
    }

    return (
        <div className="questionDisplay make-white">
            <h1 className="title">{question.name}</h1>
            {isAuthor ? (
                <div className='buttons-div cornerButtons'>
                    {isSaved ? (
                        <Button onClick={() => onSaveAction("unsave")} className="customButton qdbuttons"><BsSave2/></Button>
                    ): (
                        <Button onClick={() => onSaveAction("save")} className="customButton-outline qdbuttons"><BsSave2/></Button>
                    )}
                    <Link to="/newQuestion/true">
                        <Button className="customButton-outline qdbuttons"><BiEdit /></Button>
                    </Link>
                </div>
            ): (
                <div className='buttons-div cornerButtons'>
                    {isSaved ? (
                        <Button onClick={() => onSaveAction("unsave")} className="customButton qdbuttons"><BsSave2/></Button>
                    ): (
                        <Button onClick={() => onSaveAction("save")} className="customButton-outline qdbuttons"><BsSave2/></Button>
                    )}
                </div>
            )}
            <div className="buttons-div">
                <Button
                    className="customButton qdbuttons"
                >
                    <a
                        href={question.link}
                    >
                        Solve
                    </a>
                </Button>
                {loggedIn ? (
                    <Button
                        onClick={() => {
                            setredirect(true);
                        }}
                        variant="outline-dark"
                        className="customButton qdbuttons"
                    >
                        Post a solution <i style={{ marginLeft: "2px" }} class="fas fa-plus"></i>
                    </Button>
                ) : (
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                            <Tooltip id="tooltip-disabled">
                                You are not logged in !!
                            </Tooltip>
                        }
                    >
                        <span>
                            <Button
                                disabled
                                variant="outline-dark"
                                style={{ pointerEvents: 'none' }}
                                className="qdbuttons"
                            >
                                Post a solution <i style={{ marginLeft: "2px" }} class="fas fa-plus"></i>
                            </Button>
                        </span>
                    </OverlayTrigger>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default QuestionDisplay;