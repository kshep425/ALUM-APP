import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EDIT_MEMBER_INFO } from "../../constants/routes";
import "./mymsupage.css";


const MemberInfo = (props) => {
  const [authUser, setAuthUser] = useState(props.authUser)

  useEffect(() => {
    setAuthUser(authUser)
  }, [authUser])

  const GetOccupation = () => {
    console.log("Get Occupation");
    return authUser.members && !!authUser.members.occupation ? (
      <>
        <p>
          <strong>{authUser.members.occupation}</strong>
        </p>
      </>
    ) : (
      <p>Add your Occupation</p>
    );
  };

  const GetDegrees = () => {
    console.log("Get Degrees");
    return authUser.degrees && authUser.degrees !== []
      ? (<>
          {console.log(authUser.degrees)}
            {authUser.degrees.map(degree => {
              return (
              <p key={degree.id}>{degree.year}: {degree.degree}</p>
              )
            })}
        </>)
      : (<p>Add your Degrees</p>)
  }

  return (
    <div className="container-sm contactInfoDiv">
      <EditLink />
      <GetOccupation />
      <GetDegrees />
    </div>
  );
};

const EditLink = () => (
  <Link to={EDIT_MEMBER_INFO}>
    <i className="fa fa-edit"></i>
    Edit Member Info
  </Link>
);

export default MemberInfo;
