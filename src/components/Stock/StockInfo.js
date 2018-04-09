import React, { Component } from "react";
import { connect } from "react-redux";
import { InfoListItem } from "../common";

class UnconnectedStockInfo extends Component {
  render() {
    const { activeStock } = this.props;
    const stockInfoArr = Object.keys(activeStock);
    return (
      <div className="stock-page-container">
        {stockInfoArr.map(infoTitle => (
          <InfoListItem
            key={infoTitle}
            infoTitle={infoTitle}
            infoValue={activeStock[infoTitle]}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ stocks: { activeStock } }) => ({ activeStock });

export const StockInfo = connect(mapStateToProps)(UnconnectedStockInfo);
