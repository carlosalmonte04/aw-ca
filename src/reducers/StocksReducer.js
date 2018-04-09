import * as T from "../actions/types";

const INITIAL_STATE = {
  mostActiveStocks: [],
  allAvailableStocks: [],
  activeStock: ""
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

    case T.SET_ACTIVE_STOCK: {
      const { stock } = action.payload;

      return {
        ...state,
        activeStock: stock
      };
    }

    case T.SET_STOCK_NEWS: {
      const { stockNews } = action.payload;

      const activeStockWithNews = { ...state.activeStock, news: stockNews };

      console.log(`with news`, activeStockWithNews);

      return {
        ...state,
        activeStock: activeStockWithNews
      };
    }

    default:
      return state;
  }
};

export { StocksReducer };
