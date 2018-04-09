import React from "react";
import { connect } from "react-redux";
import { StockListItem } from "../common";

const UnconnectedMyStocks = props => {
  const { userStocks } = props;
  const userStocksArr = Object.values(userStocks);

  return (
    <div className="stocks-list-container">
      <div className="list-header-container">
        <h1 className="list-header">My stocks</h1>
      </div>
      <div className="stocks-table">
        {userStocksArr.map((stock, index) => (
          <StockListItem
            key={`${stock.symbol}${stock.name}`}
            itemNumer={index + 1}
            stock={stock}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ user: { stocks: userStocks } }) => ({
  userStocks
});

export const MyStocks = connect(mapStateToProps)(UnconnectedMyStocks);
