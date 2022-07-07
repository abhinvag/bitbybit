import React, { useState } from 'react'
import axios from "axios"
import { Button, Container, Col, Row, Form, Spinner } from "react-bootstrap"
import { useSelector } from "react-redux";
import "../styles/commentSection.css";
import { nanoid } from "nanoid";
import Comment from "./Comment"

function CommentSection(props) {

    const [comments, setcomments] = useState([]);
    const [show, setshow] = useState(false);
    const [newComment, setnewComment] = useState('');
    const loggedIn = useSelector(state => state.user).token;
    const user = useSelector(state => state.user).result
    const [spinner, setspinner] = useState(false);

    const onClick = async () => {
        try {
            setspinner(true);
            let res = await axios.get(`/comments/get/${props.id}`)
            setcomments(res.data.comments);
            setspinner(false);
            //console.log(comments);
            setshow(true);
        }
        catch (e) {
            console.log(e);
        }
    }

    const addNewComment = async () => {
        try {
            const Comment = {
                commentsId: props.id,
                author: user?.name,
                authorId: user?._id,
                id: nanoid(),
                comment: newComment
            }
            await axios.post("/comments/newComment", Comment)
            setcomments([...comments, Comment]);
            //console.log(comments);
        }
        catch (e) {
            console.log(e);
        }
        setnewComment("")
    }

    const onChange = (event) => {
        setnewComment(event.target.value);
    }

    return (
        <Container>
            {show ? (
                <Row>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setshow(false);
                        }}
                        className="hide-load-button customButton"
                    >
                        Hide comments section  <i class="fas fa-chevron-up"></i>
                    </Button>
                </Row>
            ) : (
                <Row>
                    {spinner ? (
                        <Button variant="primary" className="hide-load-button customButton" disabled>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Loading...
                        </Button>
                    ) : (
                        <Button
                            variant="dark"
                            onClick={onClick}
                            className="hide-load-button customButton"
                        >
                            Load comments section  <i className="fas fa-chevron-down"></i>
                        </Button>
                    )}
                </Row>
            )}
            {show && (
                <Row className="new-comment-container">
                    <Col lg={8} xs={12}>
                        <Form.Control
                            type="input"
                            placeholder="What's on your mind .."
                            name="newComment"
                            value={newComment}
                            onChange={onChange}
                            as="textarea"
                        />
                    </Col>
                    <Col lg={4} xs={12}>
                        {loggedIn ? (
                            <Button
                                variant="success"
                                onClick={addNewComment}
                                className="post-button"
                            >
                                Post   <i className="fas fa-plus"></i>
                            </Button>
                        ) : (
                            <Button
                                variant="success"
                                className="post-button"
                                disabled
                            >
                                Post   <i className="fas fa-plus"></i>
                            </Button>
                        )}
                    </Col>
                </Row>
            )}
            {show && (
                <Row className="complete-comment-div">
                    {(comments.length === 0) ? (
                        <h1 className="first-to-comment-heading">
                            No comments yet .. <i className="far fa-frown"></i>
                        </h1>
                    ) : (
                        <Col>
                            {comments
                                .map((value) => {
                                    return (
                                        <Comment
                                            author={value.author}
                                            comment={value.comment}
                                            authorId={value.authorId}
                                            key={value.id}
                                            commentsId={props.id}
                                            id={value.id}
                                            changeList={(comments) => {
                                                setcomments(comments);
                                            }}

                                        />
                                    )
                                })
                            }
                        </Col>
                    )}
                </Row>
            )}

        </Container>
    )
}

export default CommentSection;
