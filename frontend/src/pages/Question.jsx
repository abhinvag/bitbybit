import React, {useState, useEffect} from "react";
import QuestionDisplay from "../Components/QuestionDisplay";
import AnswersDisplay from "../Components/AnswersDisplay";
import {useDispatch, useSelector} from 'react-redux'
import {setQuestion} from "../actions/index"
import axios from "axios"
import { Spinner } from "react-bootstrap";
import "../styles/question.css"

const Question = (props) => {

    const dispatch = useDispatch();
    const [loader, setloader] = useState(true)
    const user = useSelector(state => state.user).result;
    const [isAuthor, setIsAuthor] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        async function fetchData(){
            try{
                let res = await axios.get(`/question/getQuestion/${props.match.params.id}`);
                console.log(res);
                dispatch(setQuestion(res.data));
                if(user){
                    for(var i=0;i<user.postedQuestions.length;i++){
                        if(user.postedQuestions[i]._id == res.data._id){
                            setIsAuthor(true);
                            break;
                        }
                    }
                    for(var i=0;i<user.savedQuestions.length;i++){
                        if(user.savedQuestions[i]._id == res.data._id){
                            setIsSaved(true);
                            break;
                        }
                    }
                }
                setloader(false);
            }
            catch(e){
                console.log(e);
            }
        }
        fetchData();
    }, [])

    if(loader){
        return(
            <div className="question-spinner">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        )
    }

    return (
        <div className="question-div">
            <QuestionDisplay
                isAuthor={isAuthor}
                isSaved={isSaved}
                setIsSaved={(val) => setIsSaved(val)}
            />
            <AnswersDisplay />
        </div>
    );
}

export default Question;