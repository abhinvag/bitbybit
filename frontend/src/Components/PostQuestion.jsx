import React from 'react'
import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import { useSelector } from "react-redux";

function PostQuestion() {
    // const loggedIn = useSelector(state => state.user).token

    return (
        <div>
            <Link to="/newQuestion/false">
                <Button
                    variant="light"
                    className='customButton-white'
                >
                    Add Question <i style={{ marginLeft: "2px" }} className="fas fa-plus"></i>
                </Button>
            </Link>
        </div>
    )
}

export default PostQuestion