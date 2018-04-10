import * as T from "../actions/types";

const INITIAL_STATE = {
  user: {},
  stocks: {},
  recentlyViewed: {},
  amount: 0
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case T.SET_USER_STOCKS: {
      const { stocks } = action.payload;

      return {
        ...state,
        stocks,
        amount: Object.keys(stocks || {}).length
      };
    }

    case T.ADD_STOCK_TO_RECENTLY_VIEWED: {
      const { stock } = action.payload;

      return {
        ...state,
        recentlyViewed: { ...state.recentlyViewed, ...stock }
      };
    }

    case T.ADD_STOCK: {
      const { stock } = action.payload;

      return {
        ...state,
        stocks: { ...state.stocks, ...stock },
        amount: state.amount + 1
      };
    }

    case T.REMOVE_STOCK: {
      const { stock } = action.payload;

      const prevStocks = { ...state.stocks };
      delete prevStocks[stock.symbol];

      const newStocks = prevStocks;

      return {
        ...state,
        stocks: newStocks,
        amount: state.amount - 1 < 0 ? 0 : state.amount - 1
      };
    }

    default:
      return state;
  }
};

export { UserReducer };
