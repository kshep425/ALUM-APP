import React from 'react';
import { AuthUserContext } from '../Session';
import {Link} from 'react-router-dom';
import {EDIT} from '../../constants/routes'

const ContactInfo = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        (authUser.db)
          ? (
            <div className='container-sm'>
              <div className='card m-1 p-1'>
                <EditLink />
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
                  <br />
                  {authUser.db.phone}
                  <br />
                  {authUser.db.email}
                </address>
              </div>
            </div>
          )
          : null
      )}
    </AuthUserContext.Consumer>
  );
};

const EditLink = () => (
  <Link to={EDIT}><i className="fa fa-edit"></i>
  Edit Contact Info</Link>
);

export default ContactInfo;