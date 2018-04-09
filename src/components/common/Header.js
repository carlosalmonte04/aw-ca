import React, { Component } from "react";
import { connect } from "react-redux";
import { customNavAction } from "../../actions";

class UnconnectedHeader extends Component {
  onLogoClick = () => this.props.customNavAction("/");

  render() {
    return (
      <div className="header-container">
        <p>Download Resume</p>
      </div>
    );
  }
}
export const Header = connect(null, {
  customNavAction
})(UnconnectedHeader);
