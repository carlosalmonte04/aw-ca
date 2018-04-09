import React, { Component } from "react";
import { connect } from "react-redux";
import { getMostActiveStocks } from "../../helpers";
import { setMostActiveStocks } from "../../actions";
import { StockListItem } from "../common";

class UnconnectedInsights extends Component {
  async componentDidMount() {
    try {
      const mostActiveStocks = await getMostActiveStocks();
      this.props.setMostActiveStocks(mostActiveStocks);
    } catch (err) {
      console.log("**Could not get most active stocks", err);
    }
  }

  render() {
    const { mostActiveStocks } = this.props;
    return (
      <div className="stocks-list-container">
        <div className="list-header-container">
          <h1 className="list-header">Insights</h1>
        </div>
        <div className="stocks-table">
          <div className="stock-list-item-container">
            <div className="most-active-list-item-element">
              <p />
            </div>
            <div className="most-active-list-item-element">
              <p>Symbol</p>
            </div>
            <div className="most-active-list-item-element">
              <p>Company name</p>
            </div>
            <div className="most-active-list-item-element">
              <p>Price</p>
            </div>
            <div className="most-active-list-item-element">
              <p>something</p>
            </div>
            <div className="most-active-list-item-element">
              <p>change</p>
            </div>
            <div className="most-active-list-item-element">
              <p>change</p>
            </div>
          </div>
          {mostActiveStocks.map((stock, index) => (
            <StockListItem
              insights
              key={`${stock.symbol}${stock.name}`}
              itemNumer={index + 1}
              stock={stock}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ stocks: { mostActiveStocks } }) => ({
  mostActiveStocks
});

export const Insights = connect(mapStateToProps, {
  setMostActiveStocks
})(UnconnectedInsights);
