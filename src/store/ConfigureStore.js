// configureStore.js

import { createStore } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native

import Reducers from "../reducers";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistCombineReducers(persistConfig, Reducers);

export default () => {
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
};
