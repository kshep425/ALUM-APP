import React from "react";
import { EXECUTIVE_BOARD } from "../../constants/executiveBoard";
import Card from "../BuildingComponents/Card";
import Wrapper from "../BuildingComponents/Wrapper";

import "./style.css";

// ReactDom.render(<Card />,document.getElementById("root"));

const About = () => {
  return (
    <div className="mainPage">
      <div className="aboutPageDiv">
        <h2>
          <strong>Meet The Board Members</strong>
        </h2>
        <p>
          The Alumni Board of Directors is the governing body for the MSU Alumni
          Association and demonstrates the highest level of commitment from our
          alumni community.
        </p>
        <hr className="lineDivider" />
        <div className="row">
          {EXECUTIVE_BOARD.map(member => (
            <Wrapper key={member.position}>
              <Card
                position={member.position}
                name={member.name}
                about={member.about}
              />
            </Wrapper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
