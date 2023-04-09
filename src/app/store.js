import { configureStore }               from "@reduxjs/toolkit";
import userSlice                        from "../Features/userSlice";

//Redux persist to store userSlice on windowReload
import storage                          from "redux-persist/lib/storage";
import {persistReducer}                 from "redux-persist";
import {combineReducers}                from "redux";

//Setting up the config of persistReducer
const persistConfig = {
    key: "root",
    storage,
}

//To combine all reducer in one reducer
const reducer = combineReducers({
    user: userSlice,
});

//persistReducer config
const persistedReducer = persistReducer(persistConfig, reducer);

export default configureStore({
    reducer: persistedReducer,
});