import React from 'react'
import {Container, Row, Col, Image} from "react-bootstrap"
import logo from "../images/logo.png"
import "../styles/about.css"

function About() {
    return (
        <Container>
            <Row>
                <Col className="website-div">
                    <h1 className="website-div-heading">About</h1>
                    <Image src={logo} className="website-div-image"/>
                    <p className="website-div-des">Find solutions to various data structure and algorithm questions posted by fellow programmers or post yours to gain some points.</p>
                </Col>
            </Row>
            <Row className="developedBy-div">
                <h1 
                    className="developedBy-div-heading"
                >
                    Developer - 
                    <a 
                        href="https://navabhi.codes/"
                        target="_blank"
                        className="developedBy-div-anchor"
                        rel="noreferrer"
                    >
                         navabhi <i class="fas fa-link"></i>
                    </a>
                </h1>
            </Row>
        </Container>
    )
}

export default About
