import React, { Component } from "react";
// TODO: Move files in pages to components.
import Registration from "./pages/Registration";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Wrapper from "./building_components/Wrapper/Wrapper";
import { StoreProvider } from "./utils/GlobalState";

import SignUpPage from "./components/SignUp";
import SignInPage from "./components/SignIn";
import PasswordForgetPage from "./components/PasswordForget";
import HomePage from "./components/Home";
import MyMsuPage from "./components/MyMSU";
import EventsPage from "./components/Events";
import DonatePage from "./components/Donate";
import ShcolarshipPage from "./components/Scholarships";
import AboutPage from "./components/About";
import AdminPage from "./components/Admin";
import AccountsPage from "./components/Accounts";
import EditContactInfo from './components/MyMSU/EditContactInfo'
import EditMemberInfo from './components/MyMSU/EditMemberInfo'

import NAVBAR from "./building_components/Navbar/Navbar";
import * as ROUTES from "./constants/routes";
import { withAuthentication } from "./components/Session";

class App extends Component {
  render() {
    return (
      <Router>
        <StoreProvider>
          <NAVBAR></NAVBAR>
          <div>
            <Wrapper>
              <Route exact path="/register" component={Registration} />
              <Route exact path="/" component={HomePage}></Route>
              <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
              <Route path={ROUTES.SIGN_IN} component={SignInPage} />
              <Route
                path={ROUTES.PASSWORD_FORGET}
                component={PasswordForgetPage}
              />
              <Route path={ROUTES.HOME} component={HomePage} />
              <Route path={ROUTES.MYMSU} component={MyMsuPage} />
              <Route path={ROUTES.ACCOUNTS} component={AccountsPage} />
              <Route path={ROUTES.EVENTS} component={EventsPage} />
              <Route path={ROUTES.ADMIN} component={AdminPage} />
              <Route path={ROUTES.DONATE} component={DonatePage} />
              <Route path={ROUTES.SCHOLARSHIPS} component={ShcolarshipPage} />
              <Route path={ROUTES.ABOUT} component={AboutPage} />
              <Route path={ROUTES.EDIT} component={EditContactInfo} />
              <Route path={ROUTES.EDIT_MEMBER_INFO} component={EditMemberInfo} />
            </Wrapper>
          </div>
        </StoreProvider>
      </Router>
    );
  }
}

export default withAuthentication(App);
