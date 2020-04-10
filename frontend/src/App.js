import React, { Component } from "react";
// TODO: Move files in pages to components.
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StoreProvider } from "./utils/GlobalState";

import SignUpPage from "./components/SignUp";
import SignInPage from "./components/SignIn";
import PasswordForgetPage from "./components/PasswordForget";
import HomePage from "./components/Home";
import MyMsuPage from "./components/MyMSU";
import EventsPage from "./components/Events";
import DonatePage from "./components/Donate";
import ShcolarshipPage from "./components/Scholarships";
import About from "./components/About";
import AdminPage from "./components/Admin";
import EditContactInfo from "./components/MyMSU/EditContactInfo";
import EditMemberInfo from "./components/MyMSU/EditMemberInfo";
import PayMembershipDues from "./components/MyMSU/PayMembershipDues.js";
import NAVBAR from "./building_components/Navbar/Navbar";
import * as ROUTES from "./constants/routes";
import { withAuthentication } from "./components/Session";

class App extends Component {
  render() {
    return (
      <Router>
        <StoreProvider>
          <NAVBAR />
          <Route exact path="/" component={HomePage}></Route>
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.MYMSU} component={MyMsuPage} />
          <Route path={ROUTES.EVENTS} component={EventsPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route path={ROUTES.DONATE} component={DonatePage} />
          <Route path={ROUTES.SCHOLARSHIPS} component={ShcolarshipPage} />
          <Route path={ROUTES.ABOUT} component={About} />
          <Route path={ROUTES.EDIT} component={EditContactInfo} />
          <Route path={ROUTES.EDIT_MEMBER_INFO} component={EditMemberInfo} />
          <Route path={ROUTES.PAY_DUES} component={PayMembershipDues} />
        </StoreProvider>
      </Router>
    );
  }
}

export default withAuthentication(App);
