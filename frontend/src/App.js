import React, { Component } from "react";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import LoggedIn from "./pages/LoggedIn";
import Home from "./pages/Home";
import Events from "./pages/Events";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Wrapper from "./building_components/Wrapper/Wrapper";
import Navigation from './components/Navigation'

class App extends Component {
  render() {
    return (

      <Router>
        <div>
          <Wrapper>
            <Route exact path="/register" component={Registration} />
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/loggedIn" component={LoggedIn}></Route>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/events" component={Events}></Route>
          </Wrapper>
        </div>
      </Router>
    );
  }
}

export default App;
