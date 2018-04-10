import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDataGrid from "react-data-grid";
import { getMostActiveStocks } from "../../helpers";
import {
  setMostActiveStocks,
  setActiveStock,
  customNavAction
} from "../../actions";

class UnconnectedRecentlyViewed extends Component {
  state = {
    columns: [],
    rows: []
  };

  componentDidMount() {
    const { recentlyViewed } = this.props;

    this.setState({
      columns: [
        { key: "symbol", name: "Symbol" },
        { key: "companyName", name: "Name" },
        { key: "changePercent", name: "%" },
        { key: "latestPrice", name: "Price" }
      ],
      rows: Object.values(recentlyViewed || {})
    });
  }

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

  onRowHover = i => {
    console.log(`HEY`, i);
  };

  render() {
    const { columns, rows } = this.state;
    return (
      <div className="stocks-list-container grid">
        <div className="list-header-container">
          <h1 className="list-header">Recently viewed</h1>
        </div>
        <ReactDataGrid
          enableRowSelect={false}
          columns={columns}
          rowGetter={this.rowGetter}
          rowsCount={rows.length}
          onRowClick={this.onRowClick}
          onRowHover={this.onRowHover}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ user: { stocks: userStocks, recentlyViewed } }) => ({
  recentlyViewed,
  userStocks
});

export const RecentlyViewed = connect(mapStateToProps, {
  setMostActiveStocks,
  setActiveStock,
  customNavAction
})(UnconnectedRecentlyViewed);
