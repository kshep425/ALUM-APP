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
  const [donationAmount, setDonationAmount] = useState("");
  const [valid, setValid] = useState(true);
  const [otherDonation, setOtherDonation] = useState(false);
  const [donationCategoryId, setDonationCategoryId] = useState();
  const [donationComment, setDonationComment] = useState("");

  function handleChange(event) {
    if (event.target.name === "other") {
      setOtherDonation(true);
      if (isValid(event.target.value)) {
        setDonationAmount("donation" + event.target.value);
      }
    } else {
      setOtherDonation(false);
      setDonationAmount(event.target.value);
    }
  }

  function handleDonationAmountClick(event) {
    setOtherDonation(false);
    setDonationAmount(event.target.value);
  }

  function handleDonationCategoryClick(event) {
    event.preventDefault();
    setDonationCategoryId(event.target.value);
  }

  function handleCommentChange(event) {
    setDonationComment(event.target.value)
  }

  function isValid(val) {
    if (!Number(parseInt(val, 10)) & val <= 0) {
      setValid(false);
      return false;
    }
    setValid(true);
    return true;
  }

  return (
    <div className="container" ref={props.donationInfoRef} donationcategoryid={donationCategoryId} donationcomment={donationComment} donationtype={donationAmount} >
      <div>
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
      <div className="form-check">

        <label className="form-check-label instructions odInstructions" htmlFor="other">
          Enter amount <br></br>
          <span>$<input className="donationOther" type="text" name="other" onChange={handleChange} value={donationAmount.replace("donation", "")}/>USD</span>
        </label>
        <br></br>
        <label className="donationCommentLabel" htmlFor="comment">
          Comment:
          <br></br>
          <textarea id="comment" name="donationComment" className="donationCommentBox" value={donationComment} onChange={handleCommentChange}></textarea>
        </label>
      </div>
    </div>
  )
}

export default DonationType;
