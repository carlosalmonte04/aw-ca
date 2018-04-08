import * as T from "../actions/types";
const INITIAL_STATE = {
  mostActiveStocks: {},
  allAvailableStocks: {}
};

const StocksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case T.SET_MOST_ACTIVE_STOCKS: {
      const { mostActiveStocks } = action.payload;

      return {
        ...state,
        mostActiveStocks
      };
    }
    case T.SET_ALL_AVAILABLE_STOCKS: {
      const { allAvailableStocks } = action.payload;

      return {
        ...state,
        allAvailableStocks
      };
    }
    default:
      return state;
  }
};

export { StocksReducer };
