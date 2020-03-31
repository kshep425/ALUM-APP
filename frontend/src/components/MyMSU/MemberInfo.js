import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { EDIT_MEMBER_INFO } from '../../constants/routes'

const MemberInfo = (props) => {
  const [authUser, setAuthUser] = useState(props.authUser)
  console.log(authUser)

  useEffect(() => {
    setAuthUser(authUser)
  })

  const GetOccupation = () => {
    console.log("Get Occupation")
    return (
      (authUser.members && !!authUser.members.occupation)
        ? (
        <>
          <p><strong>{authUser.members.occupation}</strong></p>
        </>)
        : (<p>Add your Occupation</p>)
    )
  }

  const GetDegrees = () => {
    console.log("Get Degrees")
    return (
      (authUser.degrees && authUser.degrees != [])
        ? (
        <>
        {console.log(authUser.degrees)}
          {authUser.degrees.map(degree => {
            return (
            <p>{degree.year}: {degree.degree}</p>
            )
          })}
        </>)
        : (<p>Add your Degrees</p>)
    )
  }

  return (

      <div className='container-sm'>
        <div className='card m-1 p-1'>
          <EditLink />
          <GetOccupation />
          <GetDegrees />
        </div>
      </div>

  )


};

const EditLink = () => (
  <Link to={EDIT_MEMBER_INFO}><i className="fa fa-edit"></i>
  Edit Member Info</Link>
);

export default MemberInfo;