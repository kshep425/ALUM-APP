import React, { useState } from 'react';

import { withFirebase } from '../Firebase';

function UserItem(props){
  const [loading, setLoading] = useState({loading: false})
  const [user, setUser] = useState({user: props.user})

  const onSendPasswordResetEmail = () => {
    props.firebase.doPasswordReset(this.state.user.email);
  };

    return (
      <div>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {user && (
          <div>
            <span>
              <strong>ID:</strong> {user.uid}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <span>
              <strong>Username:</strong> {user.username}
            </span>
            <span>
              <button
                type="button"
                onClick={onSendPasswordResetEmail}
              >
                Send Password Reset
              </button>
            </span>
          </div>
        )}
      </div>
    );
}


export default withFirebase(UserItem);
