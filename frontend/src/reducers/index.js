import { combineReducers } from "redux";
import questionReducer from "./questionReducer";
import answerReducer from "./answerReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  question: questionReducer,
  answer: answerReducer,
  user: userReducer,
});

export default rootReducer;
