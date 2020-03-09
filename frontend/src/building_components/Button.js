import React from "react";
import "./Navbar/style.css";
// This Col component offers us the convenience of being able to set a column's "size" prop instead of its className
// We can also omit the col- at the start of each Bootstrap column class, e.g. size="md-12" instead of className="col-md-12"

const Button = props => {
  return (
    <button
      className={props.className}
      key={props.key}
      onClick={() => {
        props.handleClick();
      }}
    >
      {props.children}
    </button>
  );
};

export default Button;
