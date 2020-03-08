import React, { Component } from 'react';

const responseGoogle = (googleUser) => {
    console.log(googleUser);
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
}

class LoginGoogle extends Component {
    constructor(props){
        super(props)
        this.state= {
            isSignedIn: false
        }
    }
    componentDidMount(){
        window.gapi.load('auth2', () =>{
            this.auth2 = window.gapi.auth2.init({
                client_id: process.env.REACT_APP_CLIENT_ID,
            })
        })
    }

    render(){

        return (
            <div>
            <div className="g-signin2"
                clientId={ process.env.REACT_APP_CLIENT_ID }
                buttonText="Login with Google"
                data-onSuccess={responseGoogle}
                data-onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                />
        </div>
        );
    }

}

export default LoginGoogle