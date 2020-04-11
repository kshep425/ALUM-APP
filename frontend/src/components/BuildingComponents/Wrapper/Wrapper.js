import React, { Component } from "react";
import "./style.css";

class Wrapper extends Component {
    render() {
        return (
            <main className="wrapper" {...this.props} />
        )
    }
}

export default Wrapper;
