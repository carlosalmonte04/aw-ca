const API_URL = `https://api.iextrading.com/1.0`;

export const getMostActiveStocks = async () => {
  const mostActiveStocksRes = await fetch(
    `${API_URL}/stock/market/list/mostactive`
  );

  return mostActiveStocksRes.json();
};

export const getAllAvailableStocks = async () => {
  const allAvailableStocks = await fetch(`${API_URL}/ref-data/symbols`);

  return allAvailableStocks.json();
};
