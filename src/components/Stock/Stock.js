import React, { Component } from "react";
import { ResultsList, Insights } from "./";

class Stock extends Component {
  state = {
    text: ""
  };

  onInputTextChange = ({ target: { value: text } }) => {
    this.setState({ text }, this.handleStockSearch);
  };

  handleStockSearch = () => {
    const { text } = this.state;
  };

  render() {
    const { text } = this.state;
    return (
      <div className="stock-container">
        <h1 className="project-logo">Hello 5</h1>
      </div>
    );
  }
}

export { Stock };
