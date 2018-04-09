import React from "react";
import { connect } from "react-redux";
import {
  setActiveStock,
  customNavAction,
  removeStockFromUser,
  addStockToUser
} from "../../actions";
import { showInAppNotification } from "../../helpers";
import { Colors } from "../../assets";

export const UnconnectedStockListItem = props => {
  const {
    stock,
    stock: { symbol },
    userStocks,
    userStocksAmount,
    itemNumer,
    setActiveStock,
    customNavAction,
    removeStockFromUser,
    addStockToUser,
    isForDropdown
  } = props;

  const isUserWatchingThisStock = !!userStocks[symbol];

  const onStockItemClick = ({ target: { id: elementId } }) => {
    if (elementId === `${symbol}-add-or-remove-btn`) return;

    setActiveStock(stock);
    customNavAction(`/stocks/${symbol}`);
  };

  const handleAddStockToUser = () => {
    if (userStocksAmount >= 5) {
      showInAppNotification({
        title: "Limit amount reached",
        message: `Please remove at least of your stocks to add ${symbol}`,
        backgroundColor: Colors.yellow
      });
      return;
    }

    addStockToUser(stock);

    showInAppNotification({
      title: "Stock added",
      message: `${symbol} added to you stocks.`,
      backgroundColor: Colors.green
    });
  };

  const handleRemoveStockFromUser = () => {
    removeStockFromUser(stock);

    showInAppNotification({
      title: "Stock removed",
      message: `${symbol} removed from you stocks.`,
      backgroundColor: Colors.red
    });
  };

  const onAddRemoveStockClick = () =>
    isUserWatchingThisStock
      ? handleRemoveStockFromUser()
      : handleAddStockToUser();

  if (isForDropdown) {
    return (
      <div
        key={symbol}
        onClick={onStockItemClick}
        className="stock-list-item-container"
      >
        <div className="most-active-list-item-element">
          <p>{stock.symbol || "-"}</p>
        </div>
        <div className="most-active-list-item-element">
          <p>{stock.name || "-"}</p>
        </div>
        <div
          className="add-or-remove-container"
          onClick={onAddRemoveStockClick}
        >
          <button
            id={`${symbol}-add-or-remove-btn`}
            className={`add-or-remove-btn ${
              isUserWatchingThisStock ? "remove" : "add"
            }`}
          >
            {isUserWatchingThisStock ? "-" : "+"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      key={symbol}
      onClick={onStockItemClick}
      className="stock-list-item-container"
    >
      <div className="most-active-list-item-element">
        <p>{itemNumer}</p>
      </div>
      <div className="most-active-list-item-element">
        <p>{stock.symbol || "-"}</p>
      </div>
      <div className="most-active-list-item-element">
        <p>{stock.name || "-"}</p>
      </div>
      <div className="most-active-list-item-element">
        <p>{stock.latestPrice || "-"}</p>
      </div>
      <div className="most-active-list-item-element">
        <p>{stock.activePrice || "-"}</p>
      </div>
      <div className="most-active-list-item-element">
        <p>{stock.changePercent || "-"}</p>
      </div>
      <div className="add-or-remove-container" onClick={onAddRemoveStockClick}>
        <button
          id={`${symbol}-add-or-remove-btn`}
          className={`add-or-remove-btn ${
            isUserWatchingThisStock ? "remove" : "add"
          }`}
        >
          {isUserWatchingThisStock ? "-" : "+"}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  user: { stocks: userStocks, amount: userStocksAmount }
}) => ({ userStocks, userStocksAmount });

export const StockListItem = connect(mapStateToProps, {
  setActiveStock,
  customNavAction,
  addStockToUser,
  removeStockFromUser
})(UnconnectedStockListItem);
