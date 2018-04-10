import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDataGrid from "react-data-grid";
import { getStockWithSymbol } from "../../helpers";
import {
  setMostActiveStocks,
  setActiveStock,
  setUserStocks,
  customNavAction
} from "../../actions";

class UnconnectedMyStocks extends Component {
  state = {
    columns: [],
    rows: []
  };

  async componentDidMount() {
    const { userStocks, setUserStocks } = this.props;

    const freshUserStocksProm = Object.keys(userStocks).map(async symbol => {
      return getStockWithSymbol(symbol);
    });

    const freshUserStocksArr = await Promise.all(freshUserStocksProm);

    const freshUserStocks = freshUserStocksArr.reduce((a, b) => {
      a[b.symbol] = b;
      return a;
    }, {});

    setUserStocks(freshUserStocks);

    console.log(`FRESH USER`, freshUserStocks);

    this.setState({
      columns: [
        { key: "symbol", name: "Symbol" },
        { key: "companyName", name: "Name" },
        { key: "changePercent", name: "%" },
        { key: "latestPrice", name: "Price" }
      ],
      rows: Object.values(freshUserStocks || {})
    });
  }

  componentWillReceiveProps(nextProps) {
    const { userStocksAmount } = this.props;
    const { userStocksAmount: nextUserStocksAmount, userStocks } = nextProps;
    if (userStocksAmount !== nextUserStocksAmount) {
      this.setState({
        columns: [
          { key: "symbol", name: "Symbol" },
          { key: "name", name: "Name" },
          { key: "changePercent", name: "%" },
          { key: "latestPrice", name: "Price" }
        ],
        rows: Object.values(userStocks || {})
      });
    }
  }

  rowGetter = i => this.state.rows[i];

  renderAddOrRemoveBtn = symbol => {
    if (this.props.userStocks[symbol]) {
      return <div>+</div>;
    } else return <div>-</div>;
  };

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
          <h1 className="list-header">My stocks</h1>
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

const mapStateToProps = ({
  UI: { recentlyViewed },
  user: { stocks: userStocks, amount: userStocksAmount }
}) => ({
  recentlyViewed,
  userStocks,
  userStocksAmount
});

export const MyStocks = connect(mapStateToProps, {
  setMostActiveStocks,
  setActiveStock,
  setUserStocks,
  customNavAction
})(UnconnectedMyStocks);
