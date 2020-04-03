import React, { useState } from 'react'

function RegistrationMemberType(props) {
  const [memberType, setmemberType] = useState();
  console.log(props)
  console.log(memberType)
  function handleChange(event) {
    setmemberType(event.target.value)
    console.log(memberType)
  }

  return (
    <div className="container" ref={props.memberTypeRef} value={memberType}>
      <h5>Member Registration Type</h5>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="memberType"
          id="inputCurrentLifeMemberIndividual"
          value="Current Life Member Individual"
          data-marital_status="individual"
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
          data-marital_status="married"
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
          data-marital_status="individual"
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
          data-marital_status="married"
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
          data-marital_status="individual"
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
          data-marital_status="married"
          checked={memberType === "Married Couple Life Membership Installment"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="inputMarriedLifeMemberInstallment">
          Married Couple Life Membership Installment $220
        </label>
      </div>
    </div>
  )
}

export default RegistrationMemberType;
