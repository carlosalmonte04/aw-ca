import React from "react";
import { connect } from "react-redux";
import { StockListItem } from "../common";

const UnconnectedRecentlyViewed = props => {
  const { recentlyViewed } = props;
  const recentlyViewedArr = Object.values(recentlyViewed);

  return (
    <div className="stocks-list-container">
      <div className="list-header-container">
        <h1 className="list-header">Recently viewed</h1>
      </div>
      <div className="stocks-table">
        {recentlyViewedArr.map(stock => (
          <StockListItem key={`${stock.symbol}${stock.name}`} stock={stock} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ UI: { recentlyViewed } }) => ({
  recentlyViewed
});

export const RecentlyViewed = connect(mapStateToProps)(
  UnconnectedRecentlyViewed
);
