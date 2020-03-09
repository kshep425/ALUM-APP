import React, { Component } from 'react';
import GoogleLogout from '../form_components/LogoutGoogle'
class LoggedIn extends Component {
    render() {
        return (
            <div>
                <h1>You are logged in</h1>
                <GoogleLogout ></GoogleLogout>
            </div>
        );
    }
}

export default LoggedIn;