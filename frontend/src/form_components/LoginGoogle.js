import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

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

    render(){

        return (
            <div>
            <GoogleLogin
                clientId="97008398572-7llholemgc2hs54cao34nk34v79l6hin.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                />
          </div>
        );
    }

};

export default LoginGoogle