import * as T from "./types";

export const setMostActiveStocks = mostActiveStocks => ({
  type: T.SET_MOST_ACTIVE_STOCKS,
  payload: { mostActiveStocks }
});

export const setAllAvailableStocks = allAvailableStocks => ({
  type: T.SET_ALL_AVAILABLE_STOCKS,
  payload: { allAvailableStocks }
});
