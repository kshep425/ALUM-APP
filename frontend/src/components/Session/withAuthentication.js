import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import API from '../../utils/API';

// any component can simply use React's Context to consume the authenticated user
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser')),
        //authUser2: API.getUser(token)
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          console.log("ComponentDidMount withAuththentication")
          console.log(authUser)
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.setState({ authUser });
        },
        () => {
          localStorage.removeItem('authUser');
          this.setState({ authUser: null });
        },
      );
    }

    componentWillUnmount() {
      if(typeof this.listener === "function"){
        this.listener();
      }
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
