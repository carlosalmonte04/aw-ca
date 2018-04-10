import React, { Component } from "react";
import ReactDataGrid from "react-data-grid";
import { connect } from "react-redux";
import { getStockNewsWithSymbol } from "../../helpers";
import { setStockNews } from "../../actions";
import { NewsListItem } from "./";

const UnconnectedStockNews = props => {
  const { activeStock: { news } } = props;

  const rowGetter = i => news[i];

  const columns = [
    { key: "headline", name: "Headline" },
    { key: "summary", name: "Summary" },
    { key: "datetime", name: "Date" }
  ];

  const onRowClick = i => {
    window.open(news[i].url, "_blank");
  };

  if (!news) {
    return null;
  }

  return (
    <div className="stock-page-container">
      <ReactDataGrid
        enableRowSelect={false}
        columns={columns}
        rowGetter={rowGetter}
        rowsCount={news.length}
        onRowClick={onRowClick}
      />
    </div>
  );
};

const mapStateToProps = ({ stocks: { activeStock } }) => ({ activeStock });

export const StockNews = connect(mapStateToProps, { setStockNews })(
  UnconnectedStockNews
);
