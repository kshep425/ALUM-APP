import React from 'react';
import { compose } from 'recompose';
import Carousel from '../../building_components/Carousel/Carousel'
import Footer from '../../building_components/Footer/Footer'
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';

const HomePage = () => (
<AuthUserContext.Consumer>
    {authUser => (
      <div className="mainPage">
        <h4>Welcome {authUser.providerData[0].displayName} </h4>
        <Carousel />
        <Footer />
     </div>
    )}
    </AuthUserContext.Consumer>
);

// conditional statement to see if the user is authorized or not. authUser returns a user if logged in, and returns null if the user is not logged in.
const condition = authUser => authUser != null;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
