import React, { Component } from "react";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import { InfoListItem } from "../common";

class UnconnectedStockPerfomance extends Component {
  componentDidMount() {}

  render() {
    const { activeStock: { chartData } } = this.props;
    return (
      <div className="stock-page-container">
        <Line data={chartData} options={{}} width="600" height="250" />
      </div>
    );
  }
}

const mapStateToProps = ({ stocks: { activeStock } }) => ({ activeStock });

export const StockPerformance = connect(mapStateToProps)(
  UnconnectedStockPerfomance
);
