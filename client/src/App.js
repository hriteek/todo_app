import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import NotFound from "./components/layout/NotFound";
import Todo from "./components/todo/Todo";

import PrivateRoute from "./components/common/PrivateRoute";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <Switch>
          <PrivateRoute path="/" exact component={Todo} />
          {/* <Route path="/" exact component={Todo} /> */}
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    );
  }
}
export default App;
