import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

//import { FronteggProvider } from '@frontegg/react';

const persistConfig = {
  key: "root",
  storage,
};

// const contextOptions = {
//     baseUrl: 'https://app-8b53ws3p75yt.frontegg.com',
//     clientId: '5e7e7fa8-37fa-4dff-8bf8-264471fd1bcc'
// };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

const initialState = {};

const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
