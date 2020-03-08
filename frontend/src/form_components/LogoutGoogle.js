import React from 'react';

const logout = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(()=>{
        console.log("User signed out")
    });
}

const LogoutGoogle = () => {

    return (
        <div>
            <a href="/" onClick={logout}>Logout</a>
        </div>
    );
}

export default LogoutGoogle