
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

function SignInAnonymouslyBase (props) {
  // console.log("Sign In Anonymously")
  return props;
}

const SignInAnonymously = compose(
  withFirebase,
)(SignInAnonymouslyBase);

export default SignInAnonymously;