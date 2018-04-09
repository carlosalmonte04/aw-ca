import * as T from "../actions/types";

const INITIAL_STATE = {
  recentlyViewed: {}
};

const UIReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case T.ADD_STOCK_TO_RECENTLY_VIEWED: {
      const { stock } = action.payload;

      return {
        ...state,
        recentlyViewed: { ...state.recentlyViewed, ...stock }
      };
    }

    default:
      return state;
  }
};

export { UIReducer };
