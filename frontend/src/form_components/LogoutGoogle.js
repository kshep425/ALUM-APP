import React from 'react';
import { GoogleLogout } from 'react-google-login';


const logout = () => {
    console.log("user logged out")
    window.location = "/login"
}

const LogoutGoogle = () => {

    return (
        <div>
            <GoogleLogout
                clientId="97008398572-7llholemgc2hs54cao34nk34v79l6hin.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={logout}
            >
            </GoogleLogout>
        </div>
    );
}

export default LogoutGoogle