import React from "react";
import "./styles/main.css";
import Frontegg from "./Components/Frontegg";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import HomePage from "./pages/Home";
import NewQuestion from "./pages/NewQuestion";
import NewPost from "./pages/NewPost";
import Question from "./pages/Question";
import Answer from "./pages/Answer";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Sheet from "./pages/Sheet";
import page404 from "./pages/404";

import "./styles/utils.css";

const App = () => {
  return (
    <div className="main-div">
      <Router>
        <Frontegg />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/newQuestion/:edit" exact component={NewQuestion} />
          <Route path="/newPost/:edit" exact component={NewPost} />
          <Route path="/question/:id" exact component={Question} />
          <Route path="/answer/:id" exact component={Answer} />
          <Route path="/profile/:id" exact component={Profile} />
          <Route path="/about" component={About} />
          <Route path="/sheets/:sheet" component={Sheet} />
          <Route path="/404" component={page404} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
