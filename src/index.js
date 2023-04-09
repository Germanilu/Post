import React                        from 'react';
import ReactDOM                     from 'react-dom/client';
import App                          from './App';
import                              './index.scss';
import { Provider }                 from "react-redux";
import store                        from "./app/store"
import {persistStore}               from "redux-persist";
import {PersistGate}                from "redux-persist/integration/react";
const persistor                     = persistStore(store);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

