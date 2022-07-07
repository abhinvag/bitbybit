import React, {useState, useEffect} from "react";
import {Modal, Button, Form, Row, Col} from "react-bootstrap"
import {MdDelete} from "react-icons/md";
import {AiOutlinePlus} from "react-icons/ai"
import {nanoid} from "nanoid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const UpdateLinks = (props) => {

    const [links, setLinks] = useState(props.links);
    const [newLink, setNewLink] = useState({
        site: "",
        link: ""    
    })

    const updateNewLink = (event) => {
        const {name, value} = event.target;
        setNewLink((prevValue) => {
           return{ 
            ...prevValue,
            [name]: value
           }
        })
    }

    const updateLinks = (op, id, site, link) => {
        const clone = JSON.parse(JSON.stringify(links));
        if(op == "add"){
            if(site == "" || link == ""){
                toast.error("Fields cannot be empty !!");
            }
            else{
                id = nanoid();
                clone[id] = {
                    site,
                    link
                };
                setNewLink({
                    site: "",
                    link: ""    
                })
            }
        }
        else if(op == "update"){
            clone[id].site = site;
            clone[id].link = link
        }
        else if(op == "delete"){
            delete clone[id];
        }
        setLinks(clone);
    }

    useEffect(()=>{    
        setLinks(props.links);
    }, [props.onHide])

    const onSave = async (event) => {

        event.preventDefault();

        try {
            console.log(links);
            const res = await axios.post("/user/updateLinks", {googleId: props.googleid, links: links});
            props.updateUser(res.data);
            console.log(res.data);
        } catch (error) {
            
        }
        props.onHide();
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Links
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {Object.keys(links).map((key, index) => (
                <div key={index} className="links-input">
                    {links[key].site == "mail" ? (
                        <Row>
                            <Col lg={3}>
                                <Form.Control 
                                    defaultValue={links[key].site.charAt(0).toUpperCase() + links[key].site.slice(1).toLowerCase()}
                                    disabled
                                />
                            </Col>
                            <Col lg={8}>
                                <Form.Control 
                                    disabled
                                    defaultValue={links[key].link.split(':')[1]}
                                />
                            </Col>
                            <Col lg={1}>
                                <Button
                                    disabled
                                    className="customButton-outline"
                                >
                                    <MdDelete />
                                </Button>
                            </Col>
                        </Row>
                    ) : (
                        <Row>
                            <Col lg={3}>
                                <Form.Control
                                    value={links[key].site.charAt(0).toUpperCase() + links[key].site.slice(1).toLowerCase()}
                                    onChange={(event) => {updateLinks("update", key, event.target.value, links[key].link)}}
                                />
                            </Col>
                            <Col lg={8}>
                                <Form.Control 
                                    value={links[key].link}
                                    onChange={(event) => {updateLinks("update", key, links[key].site, event.target.value)}}
                                />
                            </Col>
                            <Col lg={1}>
                                <Button
                                    className="customButton-outline"
                                    onClick={() => updateLinks("delete", key, links[key].site, links[key].link)}
                                >
                                    <MdDelete />
                                </Button>
                            </Col>
                        </Row>
                    )}
                </div>
            ))}
            {Object.keys(links).length < 5 && (
                <Row>
                    <Col lg={3}>
                        <Form.Control
                            value={newLink.site}
                            name="site"
                            onChange={updateNewLink}
                        />
                    </Col>
                    <Col lg={8}>
                        <Form.Control 
                            value={newLink.link}
                            name="link"
                            onChange={updateNewLink}
                        />
                    </Col>
                    <Col lg={1}>
                        <Button
                            className="customButton-outline"
                            onClick={() => updateLinks("add", "", newLink.site, newLink.link)}
                        >
                            <AiOutlinePlus />
                        </Button>
                    </Col>
                </Row>
            )}
        </Modal.Body>
        <Modal.Footer>
          <Button className="customButton" onClick={onSave}>Save</Button>
          <Button className="customButton" onClick={props.onHide}>Close</Button>
          <ToastContainer />
        </Modal.Footer>
      </Modal>
    );
}

export default UpdateLinks;

  