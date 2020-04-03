import React from "react";
import "./card.css";
import Member from "../../building_components/member.json"

function NewCard(props) {


  return (
    


    // <div className="card">
    //   <div className="img-container">
    //     {/* <img alt={props.name} src={props.image} /> */}
    //   </div>
    //   <div className="content">
    //     <ul>
    //       <li>
    //         <strong>{props.name}</strong> 
    //       </li>
    //       <li>
    //         <strong>{props.position}</strong> 
    //       </li>
    //       <li>
    //         <strong>About:</strong> {props.about}
    //       </li>
    //     </ul>
    //   </div>
    
    // </div>

<div className="card">

<div className="card-body" style={{float:"left"}}>
  <h5 className="card-title">{props.name}</h5>
  <p className="card-subtitle">{props.title}</p>
  <p className="card-stext">{props.position}</p>
</div>
</div>
  );

  
}

export default NewCard;