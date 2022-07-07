import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../styles/answer.css";
import { Button, Spinner, Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setQuestion, setAnswer } from "../actions/index"
import Comment from '../Components/CommentSection';
import MDEditor from '@uiw/react-md-editor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BiEdit} from "react-icons/bi";
import {BsSave2} from "react-icons/bs"
import {MdDelete} from "react-icons/md";
import {Redirect, Link} from "react-router-dom"

function Answer(prop) {

    const [answer, setAnswerLocal] = useState({
        title: "",
        createdBy: '',
        votes: 0,
        content: ""
    });
    const [loader, setloader] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const dispatch = useDispatch();

    const loggedIn = useSelector(state => state.user).token;
    const User = useSelector(state => state.user).result;
    const Question = useSelector(state => state.question);

    const updateVote = async (event, type) => {

        //event.preventDefault();

        if (!loggedIn) {
            toast.error('Not Logged In');
        }
        else{
            try{

                const res = await axios.post('/answer/updateVotes', {
                    answerId: answer._id,
                    googleId: answer.createdBy.googleId,
                    type: type
                })
                //console.log(res.data);
                setAnswerLocal(res.data);
                setIsLiked(!isLiked);
                dispatch(setAnswer(res.data));
                console.log(res);   

            }
            catch(e){
                console.log(e);
            }
        }

    }

    const onDelete = () => {
        try{
            const res = axios.post("/answer/delete",{_id:answer._id});
            console.log(res);
            setRedirect(true);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const request = {
                    params: {
                        questionId: prop.match.params.id,
                        userId: User?._id
                    }
                }
                let res = await axios.get(`/answer/get/`, request)
                setAnswerLocal(res.data.res);
                console.log(res.data);
                setloader(false);
                setIsLiked(res.data.isLikedByUser);
                dispatch(setAnswer(res.data.res));
            }
            catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    if (loader) {
        return (
            <div className="answer-spinner">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        )
    }

    if(redirect){
        return <Redirect to="/" />
    }

    return (
        <Container>
            <div className=''>
                <Row className="answer-title-container">
                    <Col>
                        <div className="answer-title" >{answer.title}</div>
                    </Col>
                </Row>
                <Row className="answer-info-div">
                    <Col lg={4} xs={12}>
                        <p className="answer-author">Author: {answer.createdBy.name}</p>
                    </Col>
                    <Col lg={8} xs={12}>
                        <p className="answer-votes">Total Votes: {answer.votes}</p>
                    </Col>
                </Row>
            </div>
            <Row style={{ marginTop: "1%", marginBottom: "2%" }}>
                <div
                    className="code-block"
                    data-color-mode="light"
                >
                    <MDEditor.Markdown source={answer.content} style={{ whiteSpace: 'pre-wrap' }}  />
                </div>
            </Row>
            <Row className='answer-buttons-div'>
                {isLiked ? (
                    <Button
                    variant="outline-dark"
                    className="answer-upvote customButton-outline"
                    onClick={(event) => updateVote(event, "downvote")}
                    >
                        <i className="far fa-thumbs-down"></i>
                    </Button>
                ): (
                    <Button
                    variant="outline-dark"
                    className="answer-upvote customButton-outline"
                    onClick={(event) => updateVote(event, "upvote")}
                    >
                        <i className="far fa-thumbs-up"></i>
                    </Button>
                )}
                {User?._id == answer.createdBy._id && (
                    <>
                        <Link to="/newPost/true" className='answer-upvote'>
                            <Button 
                                className="customButton-outline"
                            >
                                <BiEdit />
                            </Button>
                        </Link>
                        <Button onClick={() => onDelete()} className="customButton-outline answer-upvote"><MdDelete /></Button>
                    </>
                )}
            </Row>
            <Row className="comments-container">
                <Comment
                    id={answer.comments}
                />
            </Row>
            <ToastContainer />
        </Container>
    )
}

export default Answer
