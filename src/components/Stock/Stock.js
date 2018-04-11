import React, { Component } from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { StockInfo, StockPerformance, StockNews } from "./";
import {
  getStockWithSymbol,
  getStockLogoWithSymbol,
  getStockNewsWithSymbol,
  getStockChartWithSymbol,
  makeChartDataAppReady,
  showInAppNotification
} from "../../helpers";
import {
  setActiveStock,
  addRecentlyViewedStock,
  setStockNews,
  customNavAction,
  removeStockFromUser,
  addStockToUser
} from "../../actions";
import { Colors } from "../../assets";

class UnconnectedStock extends Component {
  async componentDidMount() {
    const {
      match: { params: { symbol } },
      setActiveStock,
      addRecentlyViewedStock
    } = this.props;
    try {
      const stock = await getStockWithSymbol(symbol);
      const logoUrl = await getStockLogoWithSymbol(symbol);
      const stockNews = await getStockNewsWithSymbol(symbol);
      const stockChart = await getStockChartWithSymbol(symbol);
      const appReadyChartData = makeChartDataAppReady(stockChart);

      stock.logoUrl = logoUrl;
      stock.news = stockNews;
      stock.chartData = appReadyChartData;

      setActiveStock(stock);
      addRecentlyViewedStock(stock);
    } catch (err) {
      console.log(`**Could not get stock with symbol`, err);
    }
  }
  onGoBackClick = () => {
    this.props.customNavAction("/");
  };

  handleAddStockToUser = () => {
    const {
      userStocksAmount,
      activeStock,
      activeStock: { symbol },
      addStockToUser
    } = this.props;
    if (userStocksAmount >= 5) {
      showInAppNotification({
        title: "Limit amount reached",
        message: `Please remove at least of your stocks to add ${symbol}`,
        backgroundColor: Colors.yellow
      });
      return;
    }

    addStockToUser(activeStock);

    showInAppNotification({
      title: "Stock added",
      message: `${symbol} added to you stocks.`,
      backgroundColor: Colors.green
    });
  };

  handleRemoveStockFromUser = () => {
    const {
      activeStock,
      activeStock: { symbol },
      removeStockFromUser
    } = this.props;

    removeStockFromUser(activeStock);

    showInAppNotification({
      title: "Stock removed",
      message: `${symbol} removed from you stocks.`,
      backgroundColor: Colors.red
    });
  };

  onAddRemoveStockClick = () => {
    const { activeStock: { symbol }, userStocks } = this.props;

    !!userStocks[symbol]
      ? this.handleRemoveStockFromUser()
      : this.handleAddStockToUser();
    console.log(`asastsad,`, userStocks);
  };

  render() {
    const {
      activeStock: { symbol, companyName, logoUrl },
      userStocks
    } = this.props;

    return (
      <div className="stock-container">
        <div className="stock-main-info-container">
          <div className="stock-header-container">
            <button className="go-back-btn" onClick={this.onGoBackClick}>
              Go back
            </button>
            <h1 className="stock-name">{companyName}</h1>
            <button
              className={`${!!userStocks[symbol] ? "remove" : "add"}-btn`}
              onClick={this.onAddRemoveStockClick}
            >
              {!!userStocks[symbol] ? "remove" : "add"}
            </button>
          </div>
          <h4 className="stock-symbol">{symbol}</h4>
          <img src={`${logoUrl}`} alt="stock logo" className="stock-logo" />
        </div>
        <div className="stock-navigation-headers">
          <Link to={`/stocks/${symbol}/info`}>
            <h2>Info</h2>
          </Link>
          <Link to={`/stocks/${symbol}/performance`}>
            <h2>Performance</h2>
          </Link>
          <Link to={`/stocks/${symbol}/news`}>
            <h2>News</h2>
          </Link>
        </div>
        <Route exact path="/stocks/:symbol/info" component={StockInfo} />
        <Route
          exact
          path="/stocks/:symbol/performance"
          component={StockPerformance}
        />
        <Route exact path="/stocks/:symbol/news" component={StockNews} />
      </div>
    );
  }
}
const mapStateToProps = ({
  stocks: { activeStock },
  user: { stocks: userStocks, amount: userStocksAmount }
}) => ({ activeStock, userStocks, userStocksAmount });

export const Stock = connect(mapStateToProps, {
  setActiveStock,
  addStockToUser,
  removeStockFromUser,
  addRecentlyViewedStock,
  setStockNews,
  customNavAction
})(UnconnectedStock);
