import React, { useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import { ContactInfoForm } from "../FormComponents";
import Button from "../../building_components/Button";
import API from "../../utils/API";
import * as ROUTES from "../../constants/routes";

const EditContactInfo = props => {
  const uid = useRef();
  const token = useRef();
  const prefix = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const suffix = useRef();
  const email = useRef();
  const phone = useRef();
  const streetAddress1 = useRef();
  const streetAddress2 = useRef();
  const city = useRef();
  const state = useRef();
  const zip = useRef();

  const handleSubmit = event => {
    event.preventDefault();
    console.log("Clicked Submit");

    const data = {
      prefix: prefix.current.value,
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      suffix: suffix.current.value,
      email: email.current.value,
      phone: phone.current.value,
      streetAddress1: streetAddress1.current.value,
      streetAddress2: streetAddress2.current.value,
      city: city.current.value,
      state: state.current.value,
      zip: zip.current.value
    };

    API.updateUser(data, token.current.value);
    props.history.push(ROUTES.MYMSU);
  };

  return (
    <div>
      <h1>Edit Contact Info</h1>
      <ContactInfoForm
        uidRef={uid}
        tokenRef={token}
        prefixRef={prefix}
        firstNameRef={firstName}
        lastNameRef={lastName}
        suffixRef={suffix}
        emailRef={email}
        phoneRef={phone}
        streetAddress1Ref={streetAddress1}
        streetAddress2Ref={streetAddress2}
        cityRef={city}
        stateRef={state}
        zipRef={zip}
      />
      <Link to={ROUTES.MYMSU} className="btn btn-primary cancelBtn">
        <Button>Cancel</Button>
      </Link>
      <Button className="btn btn-primary submitEventBtn" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default withRouter(EditContactInfo);
