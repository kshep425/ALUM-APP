import React from "react";
import "./scholarships.css";
// import { Document } from 'react-pdf'
// import Viewer from '@phuocng/react-pdf-viewer';

const Scholarships = () => {
  return (
    <div className="mainPage">
      <div className="scholarshipsDiv">
        <h2>
          <strong>
            Howard County Chapter Bear Pride Scholarship Application
          </strong>
        </h2>
        <hr />
        <br />
        <h3>For New Students</h3>
        <br />
        <p>
          The Howard County Chapter of Morgan State University Alumni
          Association is offering scholarship awards to Howard County residents
          who are graduating Howard County High School seniors or currently
          attending Howard Community College. The applicant must plan to enroll
          and attend Morgan State University for the upcoming academic year.
        </p>
        <h2 className="h2">Eligibility:</h2>
        <br />
        <p>To qualify for this scholarship, the applicant must: </p>
        <ul>
          <li>
            Be a Howard County High School graduating senior or a student
            transferring to Morgan from Howard Community College.
          </li>
          <li>Be accepted at Morgan State University.</li>
          <li>Be a Howard County resident.</li>
          <li>
            Have a combined math, writing and reading SAT score of 1200 or
            better.
          </li>
        </ul>

        <h2 className="h2">Selection:</h2>
        <br />
        <p>
          Scholarship applications are to be postmarked no later than April 1st.
          Scholarship recipients will be determined no later than April 15th by
          the chapter scholarship committee. Recipients will be notified by
          April 30th. If the scholarship applicant does not receive an award
          notification by April 30th, it unfortunately means that the applicant
          will not receive a scholarship award for this application year.
        </p>

        <h2>Awards:</h2>
        <br />
        <p>
          Awards vary in amount. The amount of the award will be announced and
          presented at the Howard County Chapter Scholarship Awards Ceremony in
          June. Checks will be disbursed upon verification of student enrollment
          as a full- time student at Morgan State University.
        </p>

        <h2 className="h2">The Application Package:</h2>
        <br />
        <p>
          Consideration will be given to candidates submitting complete
          application packages. To apply follow these steps:{" "}
        </p>
        <br />
        <ul>
          <li>
            Print or type all required information on the attached application.
          </li>
          <li>
            Attach an official, sealed transcript containing current grades.
          </li>
          <li>
            Attach a copy of combined SAT score (applicable to Howard County
            High School students).
          </li>
          <li>
            Attach two sealed letters of recommendation from non-family members
            (school, community, church).
          </li>
          <li>
            Attach a 500-word essay which clearly explains how this scholarship
            will assist you in achieving your goal of obtaining a college
            education at Morgan State University.
          </li>
        </ul>
        <br />
        <p>
          A complete application package must be postmarked no later than April
          1st of the application year.
        </p>
        <br />
        <div>
          <h4>Mail to:</h4>
          <address>
            Scholarship Committee
            <br />
            Howard County Chapter
            <br />
            Morgan State University
            <br />
            Alumni Association
            <br />
            P.O. Box 6847
            <br />
            Columbia, Maryland 21045
          </address>
          <br />
          <p>
            Click{" "}
            <a
              target="_blank" rel="noopener noreferrer"
              href="https://docs.google.com/forms/d/16OfOpbXHg8fElSNSJjTbvtlKqvo_U46-5M6p5CZLWyA/viewform?edit_requested=true"
            >
              Here for an online form
            </a>{" "}
            or print from{" "}
            <a
              target="_blank" rel="noopener noreferrer"
              href="https://docs.google.com/document/d/1j4AwqFuagIXkuLFhCWT1dBYnbpBRkTKl86Unvkm6iP4/edit?usp=sharing"
            >
              HERE
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Scholarships;
