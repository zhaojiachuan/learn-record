import React, { Component } from "react";
import { HashRouter, Route,Switch } from "react-router-dom";
import Login from "../Pages/Login";
import Income from '../Pages/Home'
import Register from '../Pages/Register'
import Editor from '../Pages/Dashboard/dashboard'
import Chatroom from '../Pages/Chatroom/index'

export default class Router extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Editor} />
          <Route path="/register" component={Register} />
          <Route path="/chatroom" component={Chatroom} />
          <Route path="/" component={Income} />
          
          {/* <Route path="/messageChart" component={MessageChart} /> */}
        </Switch>
      </HashRouter>
    );
  }
}