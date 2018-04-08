import React, { Component } from "react";
import { connect } from "react-redux";
import { getMostActiveStocks } from "../../helpers";
import { setMostActiveStocks } from "../../actions";

class UnconnectedInsights extends Component {
  async componentDidMount() {
    try {
      const mostActiveStocks = await getMostActiveStocks();
      this.props.setMostActiveStocks(mostActiveStocks);
    } catch (err) {
      console.log("**Could not get most active stocks", err);
    }
  }

  render() {
    const { mostActiveStocks } = this.props;
    return (
      <div className="most-active-list-container">
        {mostActiveStocks.map(mostActiveStock => (
          <div
            key={mostActiveStock.symbol}
            className="most-active-list-item-container"
          >
            <div className="most-active-list-item-element">
              <p>{mostActiveStock.symbol || "-"}</p>
            </div>
            <div className="most-active-list-item-element">
              <p>{mostActiveStock.latestPrice || "-"}</p>
            </div>
            <div className="most-active-list-item-element">
              <p>{mostActiveStock.activePrice || "-"}</p>
            </div>
            <div className="most-active-list-item-element">
              <p>{mostActiveStock.changePercent || "-"}</p>
            </div>
            <div />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ stocks: { mostActiveStocks } }) => ({
  mostActiveStocks
});

export const Insights = connect(mapStateToProps, {
  setMostActiveStocks
})(UnconnectedInsights);
