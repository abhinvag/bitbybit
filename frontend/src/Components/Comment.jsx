import React, { useState } from 'react'
import { Button, Container, Col, Row, Spinner, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import axios from "axios";
import "../styles/comment.css";
import { Link } from "react-router-dom"
import {BiEdit} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai";
import {BsFillPlusSquareFill} from "react-icons/bs";
import {ImCancelCircle} from "react-icons/im";

function Comment(props) {

    const user = useSelector(state => state.user).result;
    const [spinner, setspinner] = useState(false)
    const [comment, setComment] = useState(props.comment)
    const [wantToUpdate, setWantToUpdate] = useState(false);
    const [updatedComment, setUpdatedComment] = useState(props.comment);

    const onDelete = async () => {
        setspinner(true);
        try{
            const res = await axios.post('/comments/delete', { commentsId: props.commentsId, id: props.id })
            console.log(res.data);
            props.changeList(res.data.comments)
            setspinner(false);
        }
        catch(err){
            console.log(err);
        }
    }

    const onUpdate = async () => {
        setspinner(true);
        try {
            const res = await axios.post('/comments/update', { commentsId: props.commentsId, id: props.id, comment: updatedComment })
            console.log(res.data);
            props.changeList(res.data.comments);
            setComment(updatedComment);
            setspinner(false);
            setWantToUpdate(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container>
            <Row>
                <Link className="author-name" to={`/profile/${props.authorId}`}>
                    <p>{props.author}</p>
                </Link>
            </Row>
            {wantToUpdate ? (
                <Row>
                    <Col>
                        <Form.Control 
                            value={updatedComment}
                            name="comment"
                            as="textarea"
                            onChange={(event) => {setUpdatedComment(event.target.value)}}
                        />
                    </Col>
                    <Col>
                        <div>
                            {spinner ? (
                                <Button variant="dark" disabled size="sm" className='customButton'>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    <span className="visually-hidden"></span>
                                </Button>
                            ) : (
                                <button
                                    className="delete-button"
                                    onClick={onUpdate}
                                >
                                    <BsFillPlusSquareFill />
                                </button>
                            )}
                            {spinner ? (
                                <Button variant="primary" disabled size="sm" className='customButton'>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    <span className="visually-hidden"></span>
                                </Button>
                            ) : (
                                <button
                                    className="delete-button"
                                    onClick={() => setWantToUpdate(false)}
                                >
                                    <ImCancelCircle />
                                </button>
                            )}
                        </div>
                    </Col>
                </Row>
            ):(
                <Row>
                    <Col>
                        <p className='comment'>{comment}</p>
                    </Col>
                    <Col >
                        {(user?._id === props.authorId) && (
                            <div>
                                {spinner ? (
                                    <Button variant="dark" disabled size="sm" className='customButton'>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        <span className="visually-hidden"></span>
                                    </Button>
                                ) : (
                                    <button
                                        className="delete-button"
                                        onClick={() => setWantToUpdate(true)}
                                    >
                                        <BiEdit />
                                    </button>
                                )}
                                {spinner ? (
                                    <Button variant="primary" disabled size="sm" className='customButton'>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        <span className="visually-hidden"></span>
                                    </Button>
                                ) : (
                                    <button
                                        className="delete-button"
                                        onClick={onDelete}
                                    >
                                        <AiFillDelete />
                                    </button>
                                )}
                            </div>
                        )}
                    </Col>
                </Row>
            )}
            
        </Container>
    )
}

export default Comment
