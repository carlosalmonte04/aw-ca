import React, { Component } from "react";
import { connect } from "react-redux";
import { debounce } from "underscore";
import { setMostActiveStocks } from "../../actions";
import { StockListItem } from "../common";

class UnconnectedSuggestionDropdown extends Component {
  state = {
    filteredStocks: []
  };

  componentWillReceiveProps(nextProps) {
    const { searchText } = this.props;
    const { searchText: nextSearchText } = nextProps;

    if (nextSearchText && searchText !== nextSearchText) {
      console.log("debouncing");
      this.filterStocksDebounced();
    }
  }

  filterStocksDebounced = debounce(() => this.filterStocks(), 1000);

  filterStocks = () => {
    const filteredStocks = this.filteredStocks();
    console.log("filteredStocks", filteredStocks);

    this.setState({ filteredStocks });
  };

  filteredStocks = () => {
    const { allAvailableStocks, searchText } = this.props;
    console.log("ALL AVALIBALM", allAvailableStocks);

    const stocks = allAvailableStocks.filter(stock =>
      `${stock.symbol}${stock.name}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );

    return stocks;
  };

  render() {
    const { filteredStocks } = this.state;

    return (
      <div className="most-active-list-container">
        {filteredStocks.map(stock => (
          <StockListItem key={`${stock.symbol}${stock.name}`} stock={stock} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ stocks: { allAvailableStocks } }) => ({
  allAvailableStocks
});

export const SuggestionsDropdown = connect(mapStateToProps, {
  setMostActiveStocks
})(UnconnectedSuggestionDropdown);
