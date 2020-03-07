import React, { Component } from 'react'

class RegistrationLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <h5>Login Info</h5>
                <label for="username">Username</label>
                <input id="username" autocomplete="username" type="text" defaultValue='testuser1'></input>
                <label for="password">Password</label>
                <input id="password" autocomplete="password" type="password" defaultValue='tu1'></input>
                <label for="password">Password</label>
                <input id="password" autocomplete="password" type="password" defaultValue='tu1'></input>
            </div>
        )
    }
}

export default RegistrationLogin;