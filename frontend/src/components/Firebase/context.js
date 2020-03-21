import React from 'react';

const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => {
  // console.log("Firebase context props")
  // console.log(props)
  return (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
)};

export default FirebaseContext;
