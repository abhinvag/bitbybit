import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setUser, removeUser } from "../actions/index"

const Auth = props => {

    const dispatch = useDispatch();

    const onLoginSuccess = (res) => {
        let result = res.profileObj;
        const token = res.tokenId;
        axios.post("/user/auth", res.profileObj)
            .then(res => {
                result = res.data;
                const data = { result, token }
                dispatch(setUser(data));
            })
        props.onHide();
    }

    const onLoginFailure = (res) => {
        console.log('Login Failure:', res);
    }

    const onSignoutSuccess = () => {
        console.log("Signout success");
        dispatch(removeUser());
        props.onHide();
    }

    if (props.loginmodal === "true") {
        return (
            <Modal
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Login
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ textAlign: "center" }}>
                        <GoogleLogin
                            clientId="148804190422-ifm5pdg3ucdopsmf9sf3ap4iem5or9ik.apps.googleusercontent.com"
                            buttonText="Login with google"
                            onSuccess={onLoginSuccess}
                            onFailure={onLoginFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} className="customButton-outline">Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    else {
        return (
            <Modal
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Logout
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ textAlign: "center" }}>
                        <GoogleLogout
                            clientId="148804190422-ifm5pdg3ucdopsmf9sf3ap4iem5or9ik.apps.googleusercontent.com"
                            buttonText="Logout"
                            onLogoutSuccess={onSignoutSuccess}
                        >
                        </GoogleLogout>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} variant="primary" className='customButton-outline'>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Auth;