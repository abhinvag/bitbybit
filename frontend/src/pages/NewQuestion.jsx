import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom"
import "../styles/newQuestion.css";
import { setQuestion, setUser } from "../actions/index"
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewQuestion = (props) => {

    const dispatch = useDispatch();

    const [question, setQuestionLocal] = useState({
        Name: "",
        Link: ""
    })
    const [qid, setQid] = useState("");

    const updateQuestion = (events) => {
        const {name, value} = events.target;
        setQuestionLocal((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })   
    }

    const user = useSelector(state => state.user).result;
    const loggedIn = useSelector(state => state.user).token;
    const oldQuestion = useSelector(state => state.question);

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
      if(props.match.params.edit == "true" && oldQuestion){
        setQuestionLocal({
            _id: oldQuestion._id,
            Name: oldQuestion.name,
            Link: oldQuestion.link
        });
      }
    }, [])
    

    const onSubmit = async (event) => {

        event.preventDefault();

        if (!loggedIn) {
            toast.error('Not Logged In');
        }
        else if (question.Name === '' || question.Link === '') {
                toast.error('Field Cannot Be Empty');
        }
        else{
        
            try{
                let response;
                if(question._id){
                    response = await axios.post("/question/update", question)
                }
                else {
                    response = await axios.post("/question/new", question);
                    const newUser = {
                        googleId: user.googleId,
                        questionId: response.data._id,
                        listType: "posted"
                    }
                    const response2 = await axios.post("/user/updateQuestionList", newUser);
                    dispatch(setUser({token:loggedIn, result:response2.data}));
                }
                console.log(response);
                setQid(response.data._id);
                dispatch(setQuestion(response.data));
                setRedirect(true);
            }
            catch(err){
                toast.error("Question With Same Link Already Exists");
                console.log(err);
            }
        }

    }

    if (redirect) {
        return <Redirect to={`/question/${qid}`} />
    }

    return (
        <div>
            <div className="formDiv">
                {question._id ? (
                    <h1 className="new-question-heading">Update Question</h1>
                ) : (
                    <h1 className="new-question-heading">Add New Question</h1>
                )}
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Control
                            type="input" placeholder="Name"
                            name="Name"
                            value={question.Name}
                            onChange={updateQuestion}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control
                            className="fields"
                            type="input"
                            placeholder="Link"
                            name="Link"
                            value={question.Link}
                            onChange={updateQuestion}
                        />
                    </Form.Group>
                    {question._id ? (
                        <Button
                            variant="primary"
                            type="submit"
                            className="post-a-quesstion-button customButton"
                            onClick={onSubmit}
                        >
                            Update <i style={{ marginLeft: "5px" }} className="fas fa-arrow-right"></i>
                        </Button>
                    ): (
                        <Button
                            variant="primary"
                            type="submit"
                            className="post-a-quesstion-button customButton"
                            onClick={onSubmit}
                        >
                            Next <i style={{ marginLeft: "5px" }} className="fas fa-arrow-right"></i>
                        </Button>
                    )}
                </Form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default NewQuestion;