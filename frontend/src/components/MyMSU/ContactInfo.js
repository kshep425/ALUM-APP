import React from 'react';
import { AuthUserContext } from '../Session'

const ContactInfo = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        (authUser.db)
          ? (
            <div className='container-sm'>
              <div className='card'>
                <address>
                  <strong>{authUser.db.prefix} {authUser.db.firstName} {authUser.db.lastName} {authUser.db.suffix}</strong>
                  <br />
                  {authUser.db.streetAddress1}
                  {authUser.db.streetAddress2 || null}
                  <br />
                  {authUser.db.city},
                  {" "}
                  {authUser.db.state}
                  {" "}
                  {authUser.db.zip}
                </address>
              </div>
            </div>
          )
          : null
      )}
    </AuthUserContext.Consumer>
  );
};

export default ContactInfo;