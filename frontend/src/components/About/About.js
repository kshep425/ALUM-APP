import React from "react";
import Card from "../../building_components/Card/NewCard";
import Wrapper from "../../building_components/Wrapper/Wrapper";
import members from "../../building_components/member.json";
import "../../building_components/Card/card.css";
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
          {members.map(member => (
            <Wrapper>
              <Card
                key={member.name}
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
