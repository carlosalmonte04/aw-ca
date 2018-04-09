import moment from "moment";
import { Colors } from "../../assets";
import { STOCKS_API_URL } from "../../Config";

export const getMostActiveStocks = async () => {
  const mostActiveStocksRes = await fetch(
    `${STOCKS_API_URL}/stock/market/list/mostactive`
  );

  return mostActiveStocksRes.json();
};

export const getAllAvailableStocks = async () => {
  const allAvailableStocksRes = await fetch(
    `${STOCKS_API_URL}/ref-data/symbols`
  );

  return allAvailableStocksRes.json();
};

export const getStockWithSymbol = async symbol => {
  const stockRes = await fetch(`${STOCKS_API_URL}/stock/${symbol}/quote`);

  return stockRes.json();
};

export const getStockLogoWithSymbol = async symbol => {
  const logoRes = await fetch(`${STOCKS_API_URL}/stock/${symbol}/logo`);
  const logoJson = await logoRes.json();
  const { url: logoUrl } = logoJson;

  return logoUrl;
};

export const getStockNewsWithSymbol = async symbol => {
  const newsRes = await fetch(`${STOCKS_API_URL}/stock/${symbol}/news`);

  return newsRes.json();
};

export const getStockChartWithSymbol = async symbol => {
  const chartRes = await fetch(`${STOCKS_API_URL}/stock/${symbol}/chart/`);

  return chartRes.json();
};

export const makeChartDataAppReady = stockData => {
  const labels = [];
  const dataset = {
    label: "Close price",
    fillColor: Colors.purple,
    strokeColor: Colors.purple,
    pointColor: Colors.red,
    pointStrokeColor: Colors.purple,
    pointHighlightFill: Colors.purple,
    pointHighlightStroke: Colors.purple,
    data: []
  };

  stockData.forEach(({ label, close: closingPrice }) => {
    labels.push(label);
    dataset.data.push(closingPrice);
  });

  const datasets = [dataset];

  return {
    labels,
    datasets
  };
};

// var data = {
//   labels: ["January", "February", "March", "April", "May", "June", "July"],
//   datasets: [
//     {
//       label: "My First dataset",
//       fillColor: "rgba(220,220,220,0.2)",
//       strokeColor: "rgba(220,220,220,1)",
//       pointColor: "rgba(220,220,220,1)",
//       pointStrokeColor: "#fff",
//       pointHighlightFill: "#fff",
//       pointHighlightStroke: "rgba(220,220,220,1)",
//       data: [65, 59, 80, 81, 56, 55, 40]
//     },
//     {
//       label: "My Second dataset",
//       fillColor: "rgba(151,187,205,0.2)",
//       strokeColor: "rgba(151,187,205,1)",
//       pointColor: "rgba(151,187,205,1)",
//       pointStrokeColor: "#fff",
//       pointHighlightFill: "#fff",
//       pointHighlightStroke: "rgba(151,187,205,1)",
//       data: [28, 48, 40, 19, 86, 27, 90]
//     }
//   ]
// };
