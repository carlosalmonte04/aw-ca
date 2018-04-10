import React, { Component } from "react";
import { connect } from "react-redux";
import { customNavAction } from "../../actions";

class UnconnectedHeader extends Component {
  onLogoClick = () => this.props.customNavAction("/");

  render() {
    return (
      <div className="header-container">
        <h1 className="title">My clean 5s</h1>
      </div>
    );
  }
}
export const Header = connect(null, {
  customNavAction
})(UnconnectedHeader);
