import React from 'react';
import { AuthUserContext } from '../Session';
import {Link} from 'react-router-dom';
import {EDIT} from '../../constants/routes'

const ContactInfo = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        (authUser.members)
          ? (
            <div className='container-sm'>
              <div className='card m-1 p-1'>
                <EditLink />
                <address>
                  <strong>{authUser.members.prefix} {authUser.members.firstName} {authUser.members.lastName} {authUser.members.suffix}</strong>
                  <br />
                  {authUser.members.streetAddress1}
                  {authUser.members.streetAddress2 || null}
                  <br />
                  {authUser.members.city},
                  {" "}
                  {authUser.members.state}
                  {" "}
                  {authUser.members.zip}
                  <br />
                  {authUser.members.phone}
                  <br />
                  {authUser.members.email}
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