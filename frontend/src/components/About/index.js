import React from 'react';
import Card from '../../building_components/Card/NewCard';
import Wrapper from '../../building_components/Wrapper/Wrapper'
import members from '../../building_components/member.json'
import '../../building_components/Card/card.css'


// ReactDom.render(<Card />,document.getElementById("root"));

const About = () => {

  return (
    <div className="container">
      <h1 className="title">Meet The Board Members</h1>
    <div className="row">
      {/* <div className="col-sm-3"> */}
    {members.map((member) => 
  (<Wrapper>
    
    <Card
      position={member.position}
      name={member.name}
      about={member.about}
      />
  </Wrapper>))}
    </div>
    </div>
    // </div>
  )
}






export default About;