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
      this.filterStocksDebounced();
    }
  }

  filterStocksDebounced = debounce(() => this.filterStocks(), 500);

  filterStocks = () => {
    const filteredStocks = this.filteredStocks();

    this.setState({ filteredStocks });
  };

  filteredStocks = () => {
    const { allAvailableStocks, searchText } = this.props;

    const stocks = allAvailableStocks.filter(stock =>
      `${stock.symbol}${stock.name}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );

    return stocks;
  };

  render() {
    const { filteredStocks } = this.state;
    const { searchText } = this.props;

    if (searchText) {
      return (
        <div className="stocks-list-container dropdown">
          {filteredStocks
            .slice(0, 100)
            .map((stock, index) => (
              <StockListItem
                isForDropdown
                key={`${stock.symbol}${stock.name}`}
                itemNumer={index + 1}
                stock={stock}
              />
            ))}
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = ({ stocks: { allAvailableStocks } }) => ({
  allAvailableStocks
});

export const SuggestionsDropdown = connect(mapStateToProps, {
  setMostActiveStocks
})(UnconnectedSuggestionDropdown);
