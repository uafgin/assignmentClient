import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import TaskMain from "./Tasks/TaskMain";
import "./App.scss";

const App = () => (
  <div className="tasksLayout">
    <Router>
      <Switch>
        <Route path="/" exact component={TaskMain} />
      </Switch>
    </Router>
  </div>
);

export default App;
