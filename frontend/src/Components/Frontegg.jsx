import React, { useState, useEffect } from 'react';
//import { ContextHolder } from '@frontegg/rest-api';
//import { useAuth, useLoginWithRedirect } from "@frontegg/react";
import { useDispatch } from 'react-redux';
import { removeUser } from "../actions/index"
import { Button, Navbar, Nav, Image } from 'react-bootstrap';
import "../styles/header.css"
import logo from "../images/logo.png"
import Auth from './Auth';
import { useSelector } from 'react-redux'
import decode from 'jwt-decode';

function Frontegg() {
    // const { user, isAuthenticated } = useAuth();
    // const loginWithRedirect = useLoginWithRedirect();

    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const user = useSelector(state => state.user)?.result;
    const authToken = useSelector(state => state.user)?.token;

    useEffect(() => {
        console.log(authToken);
        if (authToken) {
            const decodedToken = decode(authToken);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                dispatch(removeUser())
            }
        }
    }, [])

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         axios.post("/user/auth", user)
    //             .then(res => {
    //                 dispatch(setUser(res.data));
    //                 console.log(res);
    //             })
    //     }
    // }, [isAuthenticated])

    // const logout = () => {
    //     const baseUrl = ContextHolder.getContext().baseUrl;
    //     window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
    //     dispatch(removeUser());
    // };

    //console.log(user)

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="primary" className='header'>
            <Navbar.Brand className="brand" href="/">
                <Image style={{ width: '20%' }} src={logo}></Image>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                {authToken ? (
                    <Nav className="ml-auto links">
                        {/* <Nav.Link href="/about">About</Nav.Link> */}
                        <a style={{ width: '22%', marginRight: '4%' }} href={`/profile/${user.googleId}`}>
                            <Image style={{ width: '100%' }} src={user.imgURL}></Image>
                        </a>
                        <Button
                            variant="primary"
                            className="button customButton"
                            onClick={() => {
                                setShowModal(true);
                            }}
                        >
                            Logout
                        </Button>
                        <Auth
                            loginmodal="false"
                            show={showModal}
                            onHide={() => {
                                setShowModal(false)
                            }
                            }
                        />
                    </Nav>
                ) : (
                    <Nav className="ml-auto links">
                        {/* <Nav.Link href="/about">About</Nav.Link> */}
                        <Button
                            variant="primary"
                            onClick={() => {
                                setShowModal(true);
                            }}
                            className="button customButton"
                        >
                            Login
                        </Button>
                        <Auth
                            loginmodal="true"
                            show={showModal}
                            onHide={() => {
                                setShowModal(false)
                            }
                            }
                        />
                    </Nav>
                )}
            </Navbar.Collapse>
        </Navbar>
    )

    // return (
    //     <div className='header-auth-div'>
    //         {isAuthenticated ? (
    //             <div className="header-auth-inside-div">
    //                 <a href={`/profile/${user.id}`}>
    //                     <img href={`/profile/${user.id}`} className="header-profile-image" src={user?.profilePictureUrl} alt={user?.name} />
    //                 </a>
    //                 <a
    //                     className="header-auth-a"
    //                     onClick={() => {
    //                         logout();
    //                     }}
    //                 >
    //                     Logout
    //                 </a>
    //             </div>
    //         ) : (
    //             <div className="header-auth-inside-div">
    //                 <a
    //                     className="header-auth-a"
    //                     onClick={() => {
    //                         loginWithRedirect()
    //                     }}
    //                 >
    //                     Login
    //                 </a>
    //             </div>
    //         )}
    //     </div>
    // );
}

export default Frontegg;