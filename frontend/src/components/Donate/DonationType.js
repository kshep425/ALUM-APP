import React, { useState } from 'react'
import "./style.css"
import { DONATIONS } from "../../constants/donations";

function DonationType(props) {
  const [donationType, setDonationType] = useState();
  const [valid, setValid] = useState(true);
  const [otherDonation, setOtherDonation] = useState(false);

  function handleChange(event) {
    if (event.target.name === "other") {
      setOtherDonation(true);
      if (isValid(event.target.value)) {
        setDonationType("donation" + event.target.value);
      }
    } else {
      setOtherDonation(false);
      setDonationType(event.target.value);
    }
  }

  function isValid(val) {
    if (!Number(parseInt(val, 10)) & val <= 0) {
      setValid(false);
      return false;
    }
    setValid(true);
    return true;
  }

  const donationTypes = [
    "donation200",
    "donation300",
    "donation400",
    "donation500",
    "donation600",
    "donation700",
    "donation800",
    "donation900",
  ]

  return (
    <div className="container" ref={props.donationTypeRef} value={donationType}>
      <h2>Select Amount</h2>
      {donationTypes.map((dt) => {
        return (
          <div key={dt} className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="donationType"
              id={dt}
              value={dt}
              checked={donationType === { dt }}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={dt}>
              ${DONATIONS[dt].amount}
            </label>
          </div>
        )
      })}
      {
        (valid)
          ? null
          : <p className="warn">Please enter a number {'>'} 0</p>
      }
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="donationType"
          id="other"
          value={donationType}
          checked={otherDonation === true}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="other">
          Other $<input type="text" name="other" onChange={handleChange}></input>
        </label>
      </div>
    </div>
  )
}

export default DonationType;
