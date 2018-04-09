import * as T from "./types";

export const removeStockFromUser = stock => ({
  type: T.REMOVE_STOCK,
  payload: { stock }
});

export const addStockToUser = stock => {
  const { symbol } = stock;

  const appReadyStock = {
    [symbol]: { ...stock }
  };

  return {
    type: T.ADD_STOCK,
    payload: { stock: appReadyStock }
  };
};
