import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from "./pages/main/Main";
import Login from "./pages/login/Login";
export default class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </Router>
    );
  }
}
