import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDataGrid from "react-data-grid";
import { getMostActiveStocks } from "../../helpers";
import {
  setMostActiveStocks,
  setActiveStock,
  customNavAction
} from "../../actions";

class UnconnectedInsights extends Component {
  state = {
    columns: [],
    rows: []
  };
  async componentDidMount() {
    try {
      const mostActiveStocks = await getMostActiveStocks();
      this.props.setMostActiveStocks(mostActiveStocks);
      this.setupTable();
    } catch (err) {
      console.log("**Could not get most active stocks", err);
    }
  }

  setupTable = () => {
    const { mostActiveStocks } = this.props;

    this.setState({
      columns: [
        { key: "symbol", name: "Symbol" },
        { key: "companyName", name: "Name" },
        { key: "changePercent", name: "%" },
        { key: "latestPrice", name: "Price" }
      ],
      rows: mostActiveStocks
    });
  };

  renderAddOrRemoveBtn = symbol => {
    if (this.props.userStocks[symbol]) {
      return <div>+</div>;
    } else return <div>-</div>;
  };

  rowGetter = i => this.state.rows[i];

  onRowClick = i => {
    const stock = this.state.rows[i];
    const { setActiveStock, customNavAction } = this.props;
    setActiveStock(stock);
    customNavAction(`/stocks/${stock.symbol}`);
  };

  render() {
    const { columns, rows } = this.state;
    return (
      <div className="stocks-list-container grid">
        <div className="list-header-container">
          <h1 className="list-header">Insights</h1>
        </div>
        <ReactDataGrid
          columns={columns}
          rowGetter={this.rowGetter}
          rowsCount={rows.length}
          onRowClick={this.onRowClick}
          on
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  stocks: { mostActiveStocks },
  user: { stocks: userStocks }
}) => ({
  mostActiveStocks,
  userStocks
});

export const Insights = connect(mapStateToProps, {
  setMostActiveStocks,
  setActiveStock,
  customNavAction
})(UnconnectedInsights);
