import React, {useState, useEffect} from 'react'
import striver from "../data/striver.js";
import {Redirect, Link} from "react-router-dom"
import {Table, Button, Container, Row, Col, Form} from "react-bootstrap"
import "../styles/sheets.css"
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {setUser} from "../actions/index"
import {RadialGauge, RadialGaugeSeries, RadialGaugeArc, LinearGauge } from "reaviz"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Sheet(props) {

    const [sheet, setSheet] = useState({});
    const [redirect, setRedirect] = useState(false);
    const user = useSelector(state => state.user).result;
    const loggedIn = useSelector(state => state.user).token;
    const [solvedQuestions, setSolvedQuestions] = useState([]);
    const [targetDate, setTargetDate] = useState(new Date());
    const dispatch = useDispatch();
    const [showCalender, setShowCalender] = useState(false);
    const [dailyTarget, setDailyTarget] = useState(0);
    const [completedToday, setCompletedToday] = useState(0);

    const sheets = {
        "striver": striver
    }
    const sizes = {
        "striver": 179
    }

    useEffect(() => {
      
        if(sheets[props.match.params.sheet]) {
            setSheet(sheets[props.match.params.sheet]);
            
            if(loggedIn){
                let tempSolvedQuestions = []
                for(var i=0;i<user.solvedQuestions.length;i++){
                    tempSolvedQuestions.push(user.solvedQuestions[i]._id);
                }
                setSolvedQuestions(tempSolvedQuestions);
            }

            const localTargetDate = localStorage.getItem("targetDate");
            if(localTargetDate){
                //console.log("target date: ", new Date(localTargetDate));
                setTargetDate(new Date(localTargetDate));
            }

            const doneToday = localStorage.getItem("completedToday")
            const doneTodayDate = localStorage.getItem("doneTodayDate")
            if(doneToday) {
                if(doneTodayDate < new Date()){
                    setCompletedToday(0);
                    localStorage.setItem("completedToday", 0);
                    localStorage.setItem("doneTodayDate", new Date());
                }
                else{
                    setCompletedToday(parseInt(doneToday));
                }
            }

            calculateDailyTarget();

        }
        else setRedirect(true);

    }, [])

    const updateSolvedQuestions = (id, action) => { // updating the solved questions list
        if(action == "save"){
            setSolvedQuestions([...solvedQuestions, id]);
        }
        else if(action == "unsave"){
            setSolvedQuestions(solvedQuestions.filter(question => question !== id));
        }
    }

    const calculateDailyTarget = () => { // calculating daily target
        const localTargetDate = localStorage.getItem("targetDate");
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const secondDate = new Date();
        let firstDate;
        if(localTargetDate){
            firstDate = new Date(localTargetDate);
        }
        else firstDate = new Date();
        //console.log(firstDate, secondDate);
        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        if(diffDays != 0){
            //console.log((sizes[props.match.params.sheet] - solvedQuestions.length));
            //console.log(diffDays);
            const dT = Math.round((sizes[props.match.params.sheet] - solvedQuestions.length) / diffDays);
            if(dT == 0 && sizes[props.match.params.sheet] - solvedQuestions.length != 0){
                setDailyTarget(1);
            }
            else setDailyTarget(dT);
        }
        else{
            setDailyTarget(sizes[props.match.params.sheet] - solvedQuestions.length);
        }
    } 

    const onClick = async (event, id) => { // questions state changed
        event.preventDefault();
        if(!loggedIn){
            toast.error("Not Logged In !!");
        }
        else{
            const obj = {googleId: user.googleId, questionId:id, listType: "solved"};
            if(event.target.checked){
                const res = await axios.post("/user/updateQuestionList", obj );
                dispatch(setUser({token:loggedIn, result:res.data}));
                updateSolvedQuestions(id, "save");
                localStorage.setItem("completedToday", completedToday+1);
                setCompletedToday(completedToday+1)
                calculateDailyTarget();
            }
            else {
                const res = await axios.post("/user/deleteFromQuestionList", obj);
                dispatch(setUser({token:loggedIn, result:res.data}));
                updateSolvedQuestions(id, "unsave");
                localStorage.setItem("completedToday", Math.max(0, completedToday-1));
                setCompletedToday(Math.max(0, completedToday-1))
                calculateDailyTarget();
            }
        }
    }

    const setDate = (value, event) => { // changing the target date 
        setTargetDate(value);
        localStorage.setItem("targetDate", value);
        setShowCalender(false);
        calculateDailyTarget();
    }

    if(redirect){
        return <Redirect to="/404" />
    }

    return (
        <div className='sheet-div'>
            <div className="sheet-questions">
                {Object.keys(sheet).map((topic, index) => (
                    <div className='sheet-topic-div'>
                        <h2 className='sheet-topic-heading'>{topic}</h2>
                        <Table hover className='sheet-topic-table'>
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Question</th>
                                    <th>Solutions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sheet[topic].map((question) => (
                                    <tr>
                                        <td className='sheet-topic-table-status'>
                                            <input 
                                                type='checkbox'
                                                onClick={(event) => onClick(event, question.id)}
                                                checked={solvedQuestions?.includes(question.id)}
                                            />
                                        </td>
                                        <td className='sheet-topic-table-name'>
                                            <a href={question.Link}>
                                                {question.Name}
                                            </a>
                                        </td>
                                        <td className='sheet-topic-table-discuss'>
                                            <Link to={`/question/${question.id}`}>
                                                <Button
                                                    className='customButton-outline'
                                                >
                                                    Discuss
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                ))}
            </div>
            <div className='sheet-leftActivity-div'>
                <div className="sheet-radialGauge make-white">
                    <RadialGauge
                        data={[{
                            key: "Solved Today",
                            data: completedToday
                        }]}
                        height={270}
                        width={270}
                        maxValue={dailyTarget}
                        minValue={0}
                        series={
                            <RadialGaugeSeries
                                outerArc={
                                    <RadialGaugeArc disabled={true} animated={true} />
                                }
                                innerArc={<RadialGaugeArc cornerRadius={12.5} />}
                                arcWidth={25}
                                colorScheme={["#38B6FF"]}
                            />
                        }
                    />
                </div>
                <div className="sheet-radialGauge make-white">
                    <RadialGauge
                        data={[{
                            key: 'Total Solved',
                            data: solvedQuestions.length
                        }]}
                        height={270}
                        width={270}
                        maxValue={sizes[props.match.params.sheet]}
                        minValue={0}
                        series={
                            <RadialGaugeSeries
                                outerArc={
                                    <RadialGaugeArc disabled={true} animated={true} />
                                }
                                innerArc={<RadialGaugeArc cornerRadius={12.5} />}
                                arcWidth={25}
                                colorScheme={["#38B6FF"]}
                            />
                        }
                    />
                </div>
                <div className="sheet-setTargetDate make-white">
                    {showCalender ? (
                        <Calendar 
                            onChange={setDate} 
                            value={targetDate} 
                            minDate={new Date()}
                        />
                    ):(
                        <div>
                            <h4>Target Date : {targetDate.getDate()}{"/"}{targetDate.getMonth()+1}{"/"}{targetDate.getUTCFullYear()}</h4>
                            <h5>Daily Target : {dailyTarget}</h5>
                            <Button
                                className='customButton'
                                onClick={() => setShowCalender(true)}
                            >
                                Update Target
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Sheet