import React from 'react'
import {Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom"

function ProfileList(props) {
  return (
    <Row className="make-white profile-list-div">
        <Col className="qa-div">
            <h1 className="qa-div-heading">{props.heading}</h1>
                <div className="qa-post-div">
                    {props.list.length == 0 ? (
                        <h4 className="profileList-noData ">No Activity Available <i className="far fa-frown"></i></h4>
                    ):(
                        <div>
                            {props.list
                                .reverse()
                                .map((value) => (
                                    <div>
                                        {props.isQuestion ? (
                                            <Link className="profile-title" to={`/question/${value._id}`}>
                                                <p>{value.name}</p>
                                            </Link>
                                        ): (
                                            <Link className="profile-title" to={`/answer/${value._id}`}>
                                                <p>{value.title}</p>
                                            </Link>
                                        )}
                                    </div>
                                ))    
                            }
                        </div>
                    )}
                </div>
        </Col>
    </Row>
  )
}

export default ProfileList