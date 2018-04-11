import React from "react";
import ReactDataGrid from "react-data-grid";
import moment from "moment";
import { connect } from "react-redux";
import { setStockNews } from "../../actions";

const UnconnectedStockNews = props => {
  const { activeStock: { news } } = props;

  const rowGetter = i => news[i];

  const dateCell = ({ value: date }) => (
    <p>
      {moment(date).calendar(null, {
        sameDay: "[Today at] h:mma",
        nextDay: "[Tomorrow]",
        nextWeek: "dddd",
        lastDay: "[Yesterday]",
        lastWeek: "dddd",
        sameElse: "MM/DD/YY"
      })}
    </p>
  );

  const columns = [
    { key: "headline", name: "Headline" },
    { key: "summary", name: "Summary" },
    { key: "datetime", name: "Date", formatter: dateCell }
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
