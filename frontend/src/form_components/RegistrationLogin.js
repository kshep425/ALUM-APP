import React, { Component } from 'react'

class RegistrationLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log('state values', this.state)
    }


    handleInputChange = e => this.setState({[e.target.id]: e.target.value})

    render() {
        return (
            <div>
                <h5>Login Info</h5>
                <form onSubmit={this.handleSubmit}>
                    <label for="username">Username</label>
                    <input id="username" autocomplete="username" onChange={this.handleInputChange} type="text" defaultValue='testuser1'></input>
                    <label for="email">email</label>
                    <input id="email" autocomplete="email" onChange={this.handleInputChange} type="text" defaultValue='testuser1'></input>
                    <label for="password">Password</label>
                    <input id="password" autocomplete="password" onChange={this.handleInputChange} type="password" defaultValue='tu1'></input>
                    <label for="passwordConfirm">Password</label>
                    <input id="passwordConfirm" autocomplete="password" onChange={this.handleInputChange} type="password" defaultValue='tu1'></input>
                </form>
            </div>
        )
    }
}

export default RegistrationLogin;