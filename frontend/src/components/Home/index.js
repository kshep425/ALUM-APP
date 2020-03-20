import React from 'react';
import { compose } from 'recompose';
import Carousel from '../../building_components/Carousel/Carousel'
import Footer from '../../building_components/Footer/Footer'
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';

const HomePage = () => (
<AuthUserContext.Consumer>
    {authUser => authUser ? (
      <div className="mainPage">
        <h4>Welcome {authUser.providerData[0].displayName} </h4>
        <Carousel />
        <Footer />
     </div>
    ) : (
      <div className="mainPage">
        <h4>Welcome</h4>
        <Carousel />
        <Footer />
     </div>
    )}
    </AuthUserContext.Consumer>
);

export default HomePage;
