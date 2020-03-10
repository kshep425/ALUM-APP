import React, { Component, createRef } from 'react'

class Login extends Component {

    constructor(props) {
        super(props)

        this.userNameRef = createRef()
        this.passwordRef = createRef()
        this.state = {

        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const member_obj = {
            username: this.userNameRef.current.value,
            password: this.passwordRef.current.value,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'

        }
        console.log(member_obj)
        /*
        fetch("/api/login", {
            method: "post",
            body: JSON.stringify(member_obj)
        }).then(res => res.json())
        .then((response)=>{
            console.log(response)
        })
        .catch((err) => {
            console.log("--------Error Occurred----------")
            console.log(err)
        })
        */
    }

    render() {
        return (
            <div>
                <form className="login" onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input id="username" autoComplete="username" type="text" ref={this.userNameRef} defaultValue='testuser1'></input>
                    <label htmlFor="password">Password</label>
                    <input id="password" autoComplete="password" type="password" ref={this.passwordRef} defaultValue='tu1'></input>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        )
    }
}

export default Login;