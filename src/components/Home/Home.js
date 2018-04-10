import React, { Component } from "react";
import { connect } from "react-redux";
import { setDropdownIsVisible } from "../../actions";
import {
  ResultsList,
  Insights,
  SuggestionsDropdown,
  RecentlyViewed,
  MyStocks
} from "./";

class UnconnectedHome extends Component {
  state = {
    searchText: "",
    isAppReady: false
  };

  componentDidMount() {
    this.setState({
      isAppReady: true
    });
  }

  componentWillUnmount(nextProps, nextState) {
    const { setDropdownIsVisible } = this.props;

    setDropdownIsVisible(false);
  }

  onInputTextChange = ({ target: { value: searchText } }) => {
    this.setState({ searchText });
  };

  onHomeClick = ({ target: { className } }) => {
    const { setDropdownIsVisible } = this.props;
    if (className.includes("home-container")) {
      console.log(`CLICKED`, className);
      setDropdownIsVisible(false);
    }
  };

  onInputFocus = () => {
    const { setDropdownIsVisible } = this.props;
    setDropdownIsVisible(true);
  };

  render() {
    const { searchText, isAppReady } = this.state;
    const { isDropdownVisible } = this.props;

    return (
      <div
        className={`home-container ${isAppReady ? "start" : ""} ${
          isDropdownVisible ? "show-overlay" : ""
        }`}
        onClick={this.onHomeClick}
      >
        <div
          className={`main-input-container ${
            isDropdownVisible ? "dropdown-visible" : ""
          }`}
        >
          <input
            type="text"
            className={`main-input ${
              isDropdownVisible ? "dropdown-visible" : ""
            }`}
            placeholder="Search"
            onFocus={this.onInputFocus}
            onChange={this.onInputTextChange}
            value={searchText}
          />
        </div>
        <SuggestionsDropdown searchText={searchText} />
        <ResultsList />
        <div
          className={`centered-boxes ${
            isDropdownVisible ? "fade-out" : "fade-in"
          }`}
        >
          <Insights />
          <RecentlyViewed />
          <MyStocks />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ UI: { isDropdownVisible } }) => ({
  isDropdownVisible
});

export const Home = connect(mapStateToProps, { setDropdownIsVisible })(
  UnconnectedHome
);
