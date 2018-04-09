import * as T from "./types";

export const setMostActiveStocks = mostActiveStocks => ({
  type: T.SET_MOST_ACTIVE_STOCKS,
  payload: { mostActiveStocks }
});

export const setAllAvailableStocks = allAvailableStocks => ({
  type: T.SET_ALL_AVAILABLE_STOCKS,
  payload: { allAvailableStocks }
});

export const setActiveStock = stock => ({
  type: T.SET_ACTIVE_STOCK,
  payload: { stock }
});

export const setStockNews = stockNews => ({
  type: T.SET_STOCK_NEWS,
  payload: { stockNews }
});
