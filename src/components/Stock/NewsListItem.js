import React from "react";
import { connect } from "react-redux";
import {
  setActiveStock,
  customNavAction,
  removeStockFromUser,
  addStockToUser
} from "../../actions";

export const UnconnectedNewsListItem = props => {
  const { newsItem, key } = props;

  const onNewsItemClick = () => {
    window.open(newsItem.url, "_blank");
  };

  return (
    <div key={key} className="stock-news-list-item" onClick={onNewsItemClick}>
      <div className="stock-news-list-item-element">
        <h3>{newsItem.headline}</h3>
      </div>
      <div className="stock-news-list-item-element">
        <p>{newsItem.summary}</p>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  user: { stocks: userStocks, amount: userStocksAmount }
}) => ({ userStocks, userStocksAmount });

export const NewsListItem = connect(mapStateToProps, {
  setActiveStock,
  customNavAction,
  addStockToUser,
  removeStockFromUser
})(UnconnectedNewsListItem);
