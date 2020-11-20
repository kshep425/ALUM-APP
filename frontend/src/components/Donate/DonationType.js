import React, { useState } from 'react'
import "./style.css"
import { DONATIONS } from "../../constants/donations";
import { DONATIONCATEGORIES } from '../../constants/donationCategories';

const donationAmounts = [
  "donation200",
  "donation300",
  "donation400",
  "donation500",
  "donation600",
  "donation700",
  "donation800",
  "donation900",
  "donation1000",
]

function displayDonationCampaign(startDate = null, endDate = null) {
  const currentDate = Date.now();

  if (startDate === null & endDate === null) {
    return true
  }
  let ed = null;
  if (endDate) {
    ed = new Date(endDate)
  }

  let sd = null;
  if (startDate) {
    sd = new Date(startDate)
  }

  if (startDate === null & ed - currentDate >= 0) {
    return true
  }


  if (sd - currentDate <= 0 & ed - currentDate >= 0) {
    return true
  }

  if (sd - currentDate <= 0 & ed === null) {
    return true
  }

  return false

}

// Display Campaign Tests (Add different date formats)
// console.log("null dates: ", displayDonationCampaign(null, null))
// console.log("sd < cd, ed null: ", displayDonationCampaign("January 1, 2020", null))
// console.log("sd > cd, ed null: ", displayDonationCampaign("November 1, 2020", null))
// console.log("sd < cd, ed < cd: ", displayDonationCampaign("January 1, 2020", "January 1, 2020"))
// console.log("sd > cd, ed > cd: ", displayDonationCampaign("November 1, 2020", "November 1, 2021"))
// console.log("sd null, ed < cd: ", displayDonationCampaign(null, "January 1, 2020"))
// console.log("sd null, ed > cd: ", displayDonationCampaign(null, "November 1, 2021"))
// console.log("sd < cd, ed > cd: ", displayDonationCampaign("January 1, 2020", "January 1, 2021"))
// console.log("sd > cd, ed < cd: ", displayDonationCampaign("November 1, 2020", "November 1, 2021"))

function DonationType(props) {
  const {handleDonationCategory} = props
  const [donationAmount, setDonationAmount] = useState("");
  const [valid, setValid] = useState(true);
  const [donationCategoryId, setDonationCategoryId] = useState();
  const [donationComment, setDonationComment] = useState("");

  function handleDonationCategoryClick(event) {
    event.preventDefault();
    setDonationCategoryId(event.target.value);
    handleDonationCategory(event.target.value)
  }

  function handleDonationAmountClick(event) {
    event.preventDefault()
    setDonationAmount(event.target.value);
  }

  function handleDonationAmountChange(event) {
    event.preventDefault()
    if (isValid(event.target.value)) {
      setDonationAmount("donation" + event.target.value);
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

  function handleCommentChange(event) {
    event.preventDefault()
    setDonationComment(event.target.value)
  }

  return (
    <div className="donationOptionsContainer" ref={props.donationInfoRef} donationcategoryid={donationCategoryId} donationcomment={donationComment} donationtype={donationAmount} >
      <div >
        <label>
          <h2>
            Select a Donation Campaign
          </h2>
          {
            DONATIONCATEGORIES.map((dc) => {
              return (displayDonationCampaign(dc.startDate, dc.endDate))
              ? <button
                  className={`donationButton mr-2 ${(donationCategoryId === dc.id) ? "toggle" : ""}`}
                  key={dc.id}
                  value={dc.id}
                  onClick={handleDonationCategoryClick}
                  >
                  {dc.categoryName}
                </button>
              : null
            })
          }
        </label>
      </div>

      <div>
        <label>
          <h2>
            Select a Donation Amount
          </h2>
          {
            donationAmounts.map((da) => {
              return (
                <button
                  className={`donationButton mr-2 ${(donationAmount === da) ? "toggle" : ""}`}
                  key={da}
                  value={da}
                  onClick={handleDonationAmountClick}
                  >
                  ${DONATIONS[da].amount}
                </button>
              )
            })
          }
        </label>
      </div>


      {
        (valid)
          ? null
          : <p className="warn">Please enter a number {'>'} 0</p>
      }
      <div className="form-check donationOtherAmount">
        <label className="form-check-label instructions odInstructions" htmlFor="other">
          <h2>Enter Amount</h2>
          <div className="donationOther">
            <h4>
              <span className="donationLeft">$</span>
              <input
                className="donationOtherInput"
                type="text"
                name="other"
                onChange={handleDonationAmountChange}
                value={donationAmount.replace("donation", "")}
                >
              </input>
              <span className="donationRight">USD</span>
            </h4>
          </div>
        </label>
        <br />
        <br />
        <h5>Enter Commment</h5>
        <textarea
          id="comment"
          name="donationComment"
          className="donationCommentBox"
          value={donationComment}
          onChange={handleCommentChange}
        >
        </textarea>
      </div>
    </div>
  )
}

export default DonationType;
