import React, { useState } from 'react'
import "./style.css"

function DonationType(props) {
  const [donationType, setdonationType] = useState();

  function handleChange(event) {
    setdonationType(event.target.value)
  }

  return (
    <div className="container" ref={props.donationTypeRef} value={donationType}>
      <h2>Select Amount</h2>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="donationType"
          id="donation15"
          value="donation15"
          checked={donationType === "donation15"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="donation15">
          $15.00
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="donationType"
          id="donation25"
          value="donation25"
          checked={donationType === "donation25"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="donation25">
          $25.00
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="donationType"
          id="donation50"
          value="donation50"
          checked={donationType === "donation50"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="donation50">
          $50.00
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="donationType"
          id="donation100"
          value="donation100"
          checked={donationType === "donation100"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="donation100">
          $100.00
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="donationType"
          id="donation250"
          value="donation250"
          checked={donationType === "donation250"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="donation250">
          $250
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="donationType"
          id="donation500"
          value="donation500"
          checked={donationType === "donation500"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="donation500">
          $500
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="donationType"
          id="donation1000"
          value="donation1000"
          checked={donationType === "donation1000"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="donation1000">
          $1000
        </label>
      </div>
    </div>
  )
}

export default DonationType;
