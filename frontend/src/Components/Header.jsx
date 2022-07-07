import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import "../styles/header.css";
import Auth from "./Auth";
import { useSelector } from 'react-redux'
import Frontegg from './Frontegg';

const Header = () => {

    const [showModal, setShowModal] = useState(false);

    const loggedIn = useSelector(state => state.loggedIn);
    const user = useSelector(state => state.user)

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Brand className="brand" href="/">Bit By Bit</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                {/* {loggedIn ? (
                    <Nav className="ml-auto links">
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href={`/profile/${user.googleId}`}>
                        <i className="far fa-user"></i>  Profile
                        </Nav.Link>
                        <Button 
                            variant="outline-light"
                            className="button"
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
                        <Nav.Link href="/about">About</Nav.Link>
                        <Button 
                            variant="outline-light"
                            onClick={() => {
                                setShowModal(true);
                            }}
                            className="button"
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
                )} */}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;