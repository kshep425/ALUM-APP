
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

function SignInAnonymouslyBase (props) {
  console.log("Sign In Anonymously")
 console.log(props)
 return props;
}

const SignInAnonymously = compose(
  withFirebase,
)(SignInAnonymouslyBase);

export default SignInAnonymously;