import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row } from 'react-bootstrap'
import "../styles/newPost.css"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { setUser, setQuestion } from "../actions/index";
import { Redirect } from "react-router-dom"
import MDEditor from '@uiw/react-md-editor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NewPost = (props) => {

    const [title, settitle] = useState('');
    const [content, setcontent] = useState('');

    const user = useSelector(state => state.user).result;
    const question = useSelector(state => state.question);
    const loggedIn = useSelector(state => state.user).token;
    const answer = useSelector(state => state.answer);

    const [redirect, setredirect] = useState(false);

    const dispatch = useDispatch();

    const changeTitle = (event) => {
        settitle(event.target.value);
    }

    const onSubmit = (event) => {

        event.preventDefault();

        if(title === "" || content === ""){
            toast.error("Fields Empty");
        }
        else{

            /*
                FLOW FOR NEW POST
                1. Commentsid get created
                2. answer gets saved in answer model  
                3. save answer id in postedAnswers field of the user 
                4. save answer id in answers field of the question
            */

            try{
                if(props.match.params.edit == "true"){

                    const newAnswer = {
                        title: title,
                        content: content,
                        _id: answer._id,
                    }
        
                    console.log(newAnswer);

                    const res = axios.post("/answer/update", newAnswer);

                    console.log(res);
                }
                else{
                    const newAnswer = {
                        title: title,
                        content: content,
                        createdBy: user._id,
                        googleId: user.googleId,
                        qid: question._id
                    }
        
                    console.log(newAnswer);

                    const res = axios.post("/answer/new", newAnswer);
                }

                setredirect(true);
            }
            catch(e){
                console.log(e);
            }

        }
        
    }

    useEffect(() => {
      if(props.match.params.edit == "true"){
        settitle(answer.title);
        setcontent(answer.content);
      }
    }, [])
    

    if (!loggedIn) {
        return <Redirect to="/" />
    }

    if (redirect) {
        //console.log(user.googleId);
        return <Redirect to={`/profile/${user.googleId}`} />
    }

    return (
        <>
            <div className="editor-div">
                <div className="editor-content">
                    <Form.Control
                        type="input"
                        placeholder="Create title for your post .."
                        name="title"
                        value={title}
                        onChange={changeTitle}
                        autoFocus
                    />
                    {/* <ReactQuill 
                        theme='snow'
                        onChange={changeContent}
                        name='content'
                        value={content}
                        modules={modules}
                        formats={formats}
                        placeholder="Create your solution here .."
                    /> */}
                    <div data-color-mode="light" className="editor-markdown">
                        <MDEditor
                            value={content}
                            onChange={setcontent}
                            highlightEnable={false}
                            tabSize={4}
                            height={300}
                        />
                    </div>
                    <div className="button-div">
                        <Button
                            className="customButton"
                            variant="dark"
                            onClick={onSubmit}
                        >
                            Submit <i style={{ marginLeft: "5px" }} className="fab fa-telegram-plane"></i>
                        </Button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default NewPost;