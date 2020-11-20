import React, { useRef, useState } from "react";
import DonationType from "./DonationType";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import Button from "../BuildingComponents/Button";
import { AuthUserContext } from "../Session";
import API from "../../utils/API";
import get from "lodash/get";
import * as ROLES from "../../constants/roles";
import Paypal from "../FormComponents/Paypal";
import donateImage from "../../images/donateBackground.png";
import { DONATIONCATEGORIES } from "../../constants/donationCategories"

const MakeDonation = (props) => {
  const donationInfoRef = useRef();
  const [checkout, setCheckout] = useState(false);
  const [dbPayment, setDbPayment] = useState();
  const [categoryId, setCategoryId] = useState("giveBack2020_2021")
  let memberId;
  let token;

  function handleDonationCategory(catId) {
    setCategoryId(catId)
  }

  function DonationCategoryInformation() {
    const categoryInfo = DONATIONCATEGORIES.find(x => x.id === categoryId)
    const categoryName = categoryInfo.categoryName;
    const categoryDescription = categoryInfo.description;

    return (
      <div className="donateCategoryInformation">
        <h1>{categoryName}</h1>
        <h2>{categoryDescription}</h2>
      </div>
    )
  }

  /**
   * handleSubmit - takes the entered donation and opens the paypal buttons page to process payment for the donation
   * @param {*} event
   */
  function handleSubmit(event) {
    event.preventDefault();

    const comment = get(donationInfoRef, "current.attributes.donationcomment.value")
    const type = get(donationInfoRef, "current.attributes.donationtype.value")

    if (!!type & !!categoryId & !!token) {
      setDbPayment({
        categoryId,
        type,
        comment,
        memberId,
      })
      setCheckout(true);
    } else if (!!type & !!categoryId) {
      const anonymousUID = "Anonymous";

      API.addNewUser({
        uid: anonymousUID,
        fullName: "Anonymous Donor",
        email: "kshep425@gmail.com",
        role: ROLES.USER
      })
        .then(result => {
          memberId = get(result, "data.id") || 2
          setDbPayment({
            categoryId,
            type,
            comment,
            memberId,
          })
          setCheckout(true);
        })

    }
    else {
      alert("Please select donation campaign and donation amount.");
    }
  }

  return (
    <AuthUserContext.Consumer>
      {authUser => {
        memberId = get(authUser, 'members.id')
        token = get(authUser, 'token')
        return (
          <div className="donateContainer">
            {checkout
              ? <Paypal
                dbPayment={dbPayment}
                memberId={memberId}
                token={token}
              />
              : <div className="grid-container">
                <div className="grid-child leftDonateImageContainer">
                  <img src={donateImage} className="donateImage" alt="Backpack and Books Photo"></img>
                  <DonationCategoryInformation />
                </div>
                <div className="grid-child">
                  <h1 className="donateHeader">Providing scholarships for Howard County's new and current <span className="orangeText">MSU students</span></h1>
                  <DonationType donationInfoRef={donationInfoRef} handleDonationCategory={(id) => { handleDonationCategory(id) }} />
                  <div className="donateSubmitDiv">
                    <Button className="submitButton" onClick={handleSubmit}>Donate</Button>
                    <Link to={ROUTES.MYMSU}>
                      <Button className="cancelButton">Cancel</Button>
                    </Link>
                  </div>
                </div>
              </div>
            }
          </div>
        )
      }}
    </AuthUserContext.Consumer>
  );
};

export default MakeDonation;