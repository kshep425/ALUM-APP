import React, { Component } from 'react';
import LoginForm from '../form_components/Login'
import LoginGoogle from '../form_components/LoginGoogle'

class Login extends Component {

    render() {
        return (
            <div>
                <LoginForm />
                <LoginGoogle />
            </div>
        );
    }
}

export default Login;