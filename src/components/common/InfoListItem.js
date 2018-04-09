import React from "react";
import { connect } from "react-redux";
import {
  setActiveStock,
  customNavAction,
  removeStockFromUser,
  addStockToUser
} from "../../actions";

export const UnconnectedInfoListItem = props => {
  const { infoTitle, infoValue, key } = props;

  if (typeof infoValue !== "string") {
    return null;
  }

  return (
    <div key={key} className="stock-info-list-item">
      <div className="stock-info-list-item">
        <h4>{infoTitle}</h4>
      </div>
      <div className="stock-info-list-item">
        <h3>{infoValue}</h3>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  user: { stocks: userStocks, amount: userStocksAmount }
}) => ({ userStocks, userStocksAmount });

export const InfoListItem = connect(mapStateToProps, {
  setActiveStock,
  customNavAction,
  addStockToUser,
  removeStockFromUser
})(UnconnectedInfoListItem);
