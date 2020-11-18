import React, { useEffect, useState } from 'react';
import { MEMBERSHIPS } from '../../constants/memberships';

const membership_types = Object.keys(MEMBERSHIPS)

function MemberTypeForm(props) {
  const [memberType, setMemberType] = useState();
  const [isMarried, setIsMarried] = useState(false)
  const [spouseName, setSpouseName] = useState()
  const [spouseEmail, setSpouseEmail] = useState("")
  const [isValidEmail, setIsValidEmail] = useState(true)

  useEffect(()=>{
    if (memberType && memberType.includes("Married")) {
      setIsMarried(true)
    } else {
      setIsMarried(false)
    }
  }, [memberType])

  useEffect(()=>{
    if (spouseEmail.length <= 5){
      setIsValidEmail(true)
      return
    }

    if (isValid(spouseEmail)) {
      setIsValidEmail(true)
    } else {

      setIsValidEmail(false)
    }
  }, [spouseEmail])

  function isValid(email) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if (!pattern.test(email)) {
      return false;
    }
    return true
  }

  function handleClick(event) {
    event.preventDefault();
    setMemberType(event.target.value)
  }

  function handleSpouseNameChange(event) {
    setSpouseName(event.target.value)
  }

  function handleSpouseEmailChange(event) {
    setSpouseEmail(event.target.value)
  }

  return (
    <div className="col donationOptionsContainer" ref={props.memberTypeRef} value={memberType} spousename={spouseName} spouseemail={spouseEmail} isvalidemail={isValidEmail.toString()}>
      <h1>Select Member Registration Type</h1>
      {membership_types.map((mt)=>{
        return (
          <button
            className={`row donationButton mr-2 ${(memberType === mt) ? "toggle" : ""}`}
            key={MEMBERSHIPS[mt].id}
            id={MEMBERSHIPS[mt].id}
            value={mt}
            checked={memberType === mt}
            onClick={handleClick}
          >
            {MEMBERSHIPS[mt].description}
          </button>

      )})}
      {(isMarried)
        ? <div className="spouseDiv">
          <p>Please enter your spouse's name and email address.</p>
          <div className="membershipInputDiv">
            <label htmlFor="spouseName">
              Spouse Name
            <input
              className="membershipInput"
              type="text"
              name="memberType"
              id="spouseName"
              data-marital_status="married"
              onChange={handleSpouseNameChange}
              required={isMarried}
            />
            </label>
          </div>
          <div className="membershipInputDiv">
            <label htmlFor="spouseEmail">
              Spouse Email
          {
          (isValidEmail) ? null : <p className="warn">Please enter a valid email</p>}
            <input
              className={`membershipInput ${(isValidEmail) ? "" : "invalid"}`}
              type="email"
              name="memberType"
              id="spouseEmail"
              data-marital_status="married"
              onChange={handleSpouseEmailChange}
              required={isMarried}
            />
            </label>
          </div>
        </div>
        : null
      }
    </div>
  )
}

export default MemberTypeForm;
