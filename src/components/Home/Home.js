import React, { Component } from "react";
import {
  ResultsList,
  Insights,
  SuggestionsDropdown,
  RecentlyViewed,
  MyStocks
} from "./";

class Home extends Component {
  state = {
    searchText: ""
  };

  onInputTextChange = ({ target: { value: searchText } }) => {
    this.setState({ searchText });
  };

  render() {
    const { searchText } = this.state;

    return (
      <div className="home-container">
        {/*<Stepper
                  steps={[{ title: "Select you 5s" }, { title: "Start watching" }]}
                  activeStep={0}
                />*/}
        <input
          type="text"
          className="main-input"
          placeholder="Search"
          onChange={this.onInputTextChange}
          value={searchText}
        />
        <SuggestionsDropdown searchText={searchText} />
        <ResultsList />
        <div className="centered-boxes">
          <Insights />
          <RecentlyViewed />
          <MyStocks />
        </div>
      </div>
    );
  }
}

export { Home };
