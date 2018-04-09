import { push } from "react-router-redux";
import * as T from "./types";

export const customNavAction = path => push(path);

export const addRecentlyViewedStock = stock => {
  const appReadyStock = { [stock.symbol]: stock };

  return {
    type: T.ADD_STOCK_TO_RECENTLY_VIEWED,
    payload: { stock: appReadyStock }
  };
};
