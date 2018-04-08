import React, { Component } from "react";
import Stepper from "react-stepper-horizontal";
import { ResultsList, Insights, SuggestionsDropdown } from "./";

class Home extends Component {
  state = {
    searchText: ""
  };

  onInputTextChange = ({ target: { value: searchText } }) => {
    this.setState({ searchText }, this.handleStockSearch);
  };

  handleStockSearch = () => {
    const { searchText } = this.state;
  };

  render() {
    const { searchText } = this.state;

    return (
      <div className="home-container">
        <h1 className="project-logo">Hello 5</h1>
        <Stepper
          steps={[{ title: "Select you 5s" }, { title: "Start watching" }]}
          activeStep={0}
        />
        <input
          type="text"
          className="main-input"
          placeholder="Search for a stock symbol"
          onChange={this.onInputTextChange}
          value={searchText}
        />
        <SuggestionsDropdown searchText={searchText} />
        <ResultsList />
        <Insights />
      </div>
    );
  }
}

export { Home };
