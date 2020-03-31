import React from "react";
import "./modal.css";

const Modal = ({ handleClose, show, children, title }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <div className="row">
          <div className="col-md-12 modal-title">
            <button onClick={handleClose} className="closeBtn">
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
            <h1 className="title">{title}</h1>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
