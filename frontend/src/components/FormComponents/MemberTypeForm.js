import React, { useEffect, useState } from 'react';

function MemberTypeForm(props) {
  const [memberType, setMemberType] = useState();
  const [isMarried, setIsMarried] = useState(false)
  const [spouseName, setSpouseName] = useState()
  const [spouseEmail, setSpouseEmail] = useState()

  useEffect(()=>{
    if (memberType && memberType.includes("Married")) {
      setIsMarried(true)
    } else {
      setIsMarried(false)
    }
  }, [memberType])

  function handleChange(event) {
    setMemberType(event.target.value)
  }

  function handleSpouseNameChange(event) {
    setSpouseName(event.target.value)
  }

  function handleSpouseEmailChange(event) {
    setSpouseEmail(event.target.value)
  }

  return (
    <div className="container" ref={props.memberTypeRef} value={memberType} spousename={spouseName} spouseemail={spouseEmail} >
      <h5>Member Registration Type</h5>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="memberType"
          id="inputCurrentLifeMemberIndividual"
          value="Current Life Member Individual"
          checked={memberType === "Current Life Member Individual"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="inputCurrentLifeMemberIndividual">
          Current Life Member Individual $25
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="memberType"
          id="inputCurrentLifeMemberMarried"
          value="Current Life Member Married Couple"
          checked={memberType === "Current Life Member Married Couple"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="inputCurrentLifeMemberMarried">
          Current Life Member Married Couple $45
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="memberType"
          id="inputNonLifeMemberIndividual"
          value="Regular Non-Life Membership Individual"
          checked={memberType === "Regular Non-Life Membership Individual"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="inputNonLifeMemberIndividual">
          Regular Non-Life Membership Individual $60
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="memberType"
          id="inputNonLifeMemberMarried"
          value="Regular Non-Life Membership Married Couple"
          checked={memberType === "Regular Non-Life Membership Individual"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="inputNonLifeMemberMarried">
          Regular Non-Life Membership Married Couple $115
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="memberType"
          id="inputIndividualLifeMemberInstallment"
          value="Individual Life Membership Installment"
          checked={memberType === "Individual Life Membership Installment"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="inputIndividualLifeMemberInstallment">
          Individual Life Membership Installment $150
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="memberType"
          id="inputMarriedLifeMemberInstallment"
          value="Married Couple Life Membership Installment"
          checked={memberType === "Married Couple Life Membership Installment"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="inputMarriedLifeMemberInstallment">
          Married Couple Life Membership Installment $220
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="memberType"
          id="inputIndividualLifeMemberFullPayment"
          value="Individual Life Membership Full Payment"
          checked={memberType === "Individual Life Membership Full Payment"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="inputIndividualLifeMemberFullPayment">
          Individual Life Membership Full Payment $500
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="memberType"
          id="inputMarriedLifeMemberFullPayment"
          value="Married Couple Life Membership Full Payment"
          checked={memberType === "Married Couple Life Membership Full Payment"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="inputMarriedLifeMemberFullPayment">
          Married Couple Life Membership Full Payment $700
        </label>
      </div>
      {(isMarried)
        ? <div>
          <p>Please enter your spouse's name and email address.</p>
          <div>
            <label htmlFor="spouseName">
              Spouse Name
            <input
              type="text"
              name="memberType"
              id="spouseName"

              data-marital_status="married"
              onChange={handleSpouseNameChange}
            />
            </label>
          </div>
          <div>
            <label htmlFor="spouseEmail">
              Spouse Email
            <input
              type="text"
              name="memberType"
              id="spouseEmail"

              data-marital_status="married"
              onChange={handleSpouseEmailChange}
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
