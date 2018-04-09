import { routerReducer } from "react-router-redux";
import { StocksReducer } from "./StocksReducer";
import { UserReducer } from "./UserReducer";
import { UIReducer } from "./UIReducer";

export default {
  stocks: StocksReducer,
  user: UserReducer,
  UI: UIReducer,
  routerReducer
};
