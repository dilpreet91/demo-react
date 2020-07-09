import { createStore, compose, combineReducers } from "redux";
import storeDataReducer from "./reducers/data";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";


const numberPersistConfig = {
  key: "persistedStore",
  version: 1,
  storage
};

const mainReducer = combineReducers({
  storeData: storeDataReducer
});

const persistedReducer = persistReducer(numberPersistConfig, mainReducer);

const store = createStore(
  persistedReducer,
  compose(window.devToolsExtension ? window.devToolsExtension() : f => f)
);

export const persistor = persistStore(store);

export default store;