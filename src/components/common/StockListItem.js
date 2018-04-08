import React from "react";

export const StockListItem = props => {
  const { symbol, name } = props.stock;
  return (
    <div key={symbol} className="stock-list-item-container">
      <div className="stock-list-item-container-element">
        <p>{symbol || "-"}</p>
      </div>
      <div className="stock-list-item-container-element">
        <p>{name || "-"}</p>
      </div>
      <div>
        <p>+</p>
      </div>
    </div>
  );
};
