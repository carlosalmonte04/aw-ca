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
  makeChartDataAppReady
} from "../../helpers";
import {
  setActiveStock,
  addRecentlyViewedStock,
  setStockNews
} from "../../actions";

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

  render() {
    const { activeStock: { symbol, companyName, logoUrl } } = this.props;
    return (
      <div className="stock-container">
        <div className="stock-main-info-container">
          <h1 className="stock-name">{companyName}</h1>
          <h4 className="stock-symbol">{symbol}</h4>
          <img src={`${logoUrl}`} alt="stock logo" />
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
const mapStateToProps = ({ stocks: { activeStock } }) => ({ activeStock });

export const Stock = connect(mapStateToProps, {
  setActiveStock,
  addRecentlyViewedStock,
  setStockNews
})(UnconnectedStock);
