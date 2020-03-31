import React from 'react';
import Carousel from '../../building_components/Carousel/Carousel'
import Footer from '../../building_components/Footer/Footer'
import { AuthUserContext } from '../Session';

const HomePage = () => (
<AuthUserContext.Consumer>
    {authUser => authUser ? (
      <div className="mainPage">
        {console.log(authUser)}
        <h4>Welcome {authUser.members.username || authUser.providerData[0].displayName} </h4>
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
