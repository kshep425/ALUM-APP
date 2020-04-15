import React, { useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import { MemberInfoForm } from "../FormComponents"
import * as ROUTES from "../../constants/routes";
import Button from "../BuildingComponents/Button";
import API from "../../utils/API"
import { AuthUserContext, withAuthorization } from "../Session";
import get from 'lodash/get'
import { compose } from 'recompose'

const EditMemberInfo = (props) => {
  console.log(props);
  const occupationRef = useRef();
  const gradYear1Ref = useRef();
  const gradYear2Ref = useRef();
  const gradYear3Ref = useRef();
  const gradMajor1Ref = useRef();
  const gradMajor2Ref = useRef();
  const gradMajor3Ref = useRef();
  let token;
  let authUserDegrees;

  const handleSubmit = async () => {
    const occupation = occupationRef.current.value
    console.log(occupation)
    API.updateUser({ occupation }, token);
    const degrees = [
      {
        year: gradYear1Ref.current.value,
        degree: gradMajor1Ref.current.value,
        degreeId: get(authUserDegrees[0], 'id'),
      },
      // {
      //   year: gradYear2Ref.current.value,
      //   degree: gradMajor2Ref.current.value,
      //   degreeId: get(authUserDegrees[1], 'id'),
      // },
      // {
      //   year: gradYear3Ref.current.value,
      //   degree: gradMajor3Ref.current.value,
      //   degreeId: get(authUserDegrees[2], 'id'),
      // }
    ]


    console.log(degrees)
    const degreeResult = await API.updateDegreeInfo({ degrees }, token);
    console.log(degreeResult)
    props.history.push(ROUTES.MYMSU)
  }
  console.log(props)
  return (
    <AuthUserContext.Consumer>
      {authUser => {
        token = authUser.token;
        authUserDegrees = authUser.degrees;
        return (
          <div className="container">
            <h1>Edit Member Info</h1>
            <div className="container">
              <MemberInfoForm
                authUser={authUser}
                occupationRef={occupationRef}
                gradMajor1Ref={gradMajor1Ref}
                gradMajor2Ref={gradMajor2Ref}
                gradMajor3Ref={gradMajor3Ref}
                gradYear1Ref={gradYear1Ref}
                gradYear2Ref={gradYear2Ref}
                gradYear3Ref={gradYear3Ref}
              />
              <Link to={ROUTES.MYMSU}><Button>Cancel</Button></Link>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        )
      }}
    </AuthUserContext.Consumer>
  );
};

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition)
    (EditMemberInfo));