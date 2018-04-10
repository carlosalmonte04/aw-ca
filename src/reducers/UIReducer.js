import * as T from "../actions/types";

const INITIAL_STATE = {
  isDropdownVisible: false
};

const UIReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case T.SET_DROPDOWN_IS_VISIBLE: {
      const { bool } = action.payload;

      return {
        ...state,
        isDropdownVisible: bool
      };
    }

    default:
      return state;
  }
};

export { UIReducer };
