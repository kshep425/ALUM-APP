import React, { Component, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import LoggedIn from '../pages/LoggedIn'
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from"react-router-dom"
import Wrapper from "../building_components/Wrapper/Wrapper";

function LoginGoogle() {

    const [isSignedIn, setIsSignedIn] = useState(
        {
            signedIn: false,
            tokenId: ""
        })

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

        setIsSignedIn({
            signedIn: true,
            tokenId: id_token
        })


    }
    useEffect(() => {
        console.log(isSignedIn)
    })

    if (isSignedIn.signedIn === true) {
        return (
            <Redirect
            to={{
              pathname: "/loggedIn",
              state: {isSignedIn}
            }}
          />
        );
    } else {
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