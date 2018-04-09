import React, { Component } from "react";
import { connect } from "react-redux";
import { getStockNewsWithSymbol } from "../../helpers";
import { setStockNews } from "../../actions";
import { NewsListItem } from "./";

const UnconnectedStockNews = props => {
  const { activeStock: { news } } = props;

  if (!news) {
    return null;
  }

  return (
    <div className="stock-page-container">
      {news.map(newsItem => (
        <NewsListItem key={newsItem.headline} newsItem={newsItem} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ stocks: { activeStock } }) => ({ activeStock });

export const StockNews = connect(mapStateToProps, { setStockNews })(
  UnconnectedStockNews
);
