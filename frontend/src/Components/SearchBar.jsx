import React, { useState } from 'react';
import axios from "axios";
import { Form, Container, Row, Image } from 'react-bootstrap'
import QuestionBadge from './QuestionBadge';
import "../styles/searchBar.css"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SearchImg from "../images/undraw_handcrafts_search.svg"

function SearchBar() {

    const [questionList, setQuestionList] = useState([]);
    const [name, setName] = useState("");
    const [display, setDisplay] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            let res = await axios.get("/question/getQuestionList");
            setQuestionList(res.data);
            setLoading(false);
        }
        catch (e) {
            console.log(e);
        }
    }

    const updateName = (event) => {
        setName(event.target.value);
        if (event.target.value.length > 0) {
            setDisplay(true);
        }
        else {
            setDisplay(false);
        }
    }

    return (
        <Container className="search-bar-container">
            <Row>
                {!display && (
                    <Image src={SearchImg} style={{ borderRadius: 0 }} className="search-bar-image" />
                )}
            </Row>
            <Row>
                <Form.Control
                    name="name"
                    value={name}
                    onChange={updateName}
                    onClick={() => {
                        fetchData();
                        setDisplay(!display)
                    }}
                    placeholder="Search for a problem .. "
                    className="search-bar-input"
                />
            </Row>
            {display && (
                <div className="search-bar-badges-container">
                    {loading ? (
                        <Skeleton count={20} />
                    ) : (
                        <div className="search-bar-badges">
                            {questionList
                                .filter(question => question.name.toLowerCase().indexOf(name.toLowerCase()) > -1)
                                .slice(0, 10)
                                .map((question) => {
                                    return (
                                        <QuestionBadge
                                            key={question._id}
                                            name={question.name}
                                            id={question._id}
                                        />
                                    );
                                })
                            }
                        </div>
                    )}
                </div>
            )}
        </Container>
    )
}

export default SearchBar
