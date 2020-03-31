import React from "react";
import "../../building_components/Navbar/style.css";
import { withFirebase } from "../Firebase";

const SignOutButton = ({ firebase }) => (
  <button className="signoutBtn" type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
