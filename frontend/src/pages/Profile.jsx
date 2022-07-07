import React, {useState, useEffect} from 'react'
import {Image, Container, Row, Col, Spinner, Button} from 'react-bootstrap';
import ProfileList from "../Components/ProfileList"
import "../styles/profile.css"
import axios from "axios"
import {AiOutlineMail, AiOutlineTwitter, AiOutlineGithub, AiFillLinkedin, AiOutlinePlus} from "react-icons/ai"
import {SiLeetcode, SiCodeforces, SiCodechef, SiHackerrank, SiHackerearth} from "react-icons/si"
import {CgProfile} from "react-icons/cg";
import {useSelector} from "react-redux";
import UpdateLinks from "../Components/UpdateLinks";
import {Redirect} from "react-router-dom";

function Profile(prop) {

    const [loader, setloader] = useState(true);
    const [user, setuser] = useState({
        "googleId" : "",
    });
    const [canAddLink, setCanAddLink] = useState(true);
    const currUser = useSelector((state) => state.user).result;
    const [modalShow, setModalShow] = useState(false);
    const [redirect, setRedirect] = useState(false);
    //const [links, setLinks] = useState();

    const icons = {
        "mail": <AiOutlineMail />,
        "twitter": <AiOutlineTwitter />,
        "linkedin": <AiFillLinkedin />,
        "github": <AiOutlineGithub />,
        "leetcode": <SiLeetcode />,
        "codeforces": <SiCodeforces />,
        "codechef": <SiCodechef />,
        "hackerrank":<SiHackerrank />,
        "hackerearth": <SiHackerearth />,
    }

    let handler = {
        get: function(target, name) {
          return target.hasOwnProperty(name) ? target[name] : <CgProfile />;
        }
    }

    let iconProxy = new Proxy(icons, handler);

    useEffect(() => {
        async function fetchData(){
            try{
                let res = await axios.get(`/user/get/${prop.match.params.id}`)
                console.log(res.data);
                setuser(res.data);
                //setLinks(res.data.links);
                if(Object.keys(res.data.links).length >= 5){
                    setCanAddLink(false);
                }
                setloader(false);

            }
            catch(e){
                console.log(e);
            }
        }
        fetchData();
    }, []);

    // const updateLinks = (links) => {
    //     setLinks(links);
    // }

    if(loader){
        return(
            <div className="profile-spinner">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        )
    }

    // if(redirect){
    //     return <Redirect to="/404" /> 
    // }

    // console.log(currUser);

    return (
        <Container className="profile-div" >
            <Row className="first-div make-white">
                <Col lg={2} xs={12} sm={12} md={4}><Image className="profileImage" src={user.imgURL} /></Col>
                <Col lg={10} xs={12} sm={12} md={8}>
                    <p className="intro-p">{user.name}</p>
                    <p className="intro-p">{user.points} <i className="fas fa-coins"></i></p>
                    <div className='profile-links'>
                        {Object.keys(user.links).map((key, index) => (
                            <Button className="customButton-outline profile-links-button" key={index}>
                                <a href={user.links[key].link}>
                                    {iconProxy[user.links[key].site.toLowerCase()]} {" "}
                                    {user.links[key].site.charAt(0).toUpperCase() + user.links[key].site.slice(1).toLowerCase()}
                                </a>
                            </Button>
                        ))}
                        {currUser?.googleId == user.googleId && (
                            <>
                                <Button className="customButton profile-links-button" onClick={() => setModalShow(true)}>
                                    Update 
                                </Button>
                                <UpdateLinks
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    links={user.links}
                                    googleid={user.googleId}
                                    updateUser={(user) => setuser(user)}
                                />
                            </>
                        )}
                    </div>
                </Col>
            </Row>
            <ProfileList 
                heading="Solved Questions"
                list = {user.solvedQuestions}
                isQuestion = {true}
            />
            <ProfileList 
                heading="Posted Answers"
                list = {user.postedAnswers}
                isQuestion = {false}
            />
            <ProfileList 
                heading="Posted Questions"
                list = {user.postedQuestions}
                isQuestion = {true}
            />
            {currUser?.googleId == user.googleId && (
                <ProfileList 
                    heading="Your Upvotes"
                    list = {user.likedAnswers}
                    isQuestion = {false}
                />
            )}
            {currUser?.googleId == user.googleId && (
                <ProfileList 
                    heading="Saved For Later"
                    list = {user.savedQuestions}
                    isQuestion = {true}
                />
            )}
        </Container>
    )
}

export default Profile
