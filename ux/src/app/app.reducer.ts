import { combineReducers, Reducer } from "redux";
import { store } from "../store";
import { IPluginConfig } from "./app.types";
import { createReducer, createAction } from "@reduxjs/toolkit";
import { name, version } from "../../package.json";

export const getAppConfig = createAction("GET_CONFIG");
export const persistAppState = createAction("persist/PERSIST");

const initialState = { name, plugins: [], version };
const appReducer = createReducer(initialState, {
  [getAppConfig as any]: (state, action) => state,
  [persistAppState as any]: (state, action) => state,
});

export default appReducer;

export let APP_REDUCERS: Record<string, Reducer> = { app: appReducer };
export let COMBINED_REDUCERS: Reducer = combineReducers(APP_REDUCERS);

export const createAppReducer = (
  plugins: ReadonlyArray<IPluginConfig>
): Record<string, Reducer> => {
  const appReducers: Record<string, Reducer> = APP_REDUCERS;
  plugins.forEach((plugin) => (appReducers[plugin.name] = plugin.reducer));
  return appReducers;
};

export const RegisterState = (plugins: ReadonlyArray<IPluginConfig>) => {
  APP_REDUCERS = createAppReducer(plugins);
  COMBINED_REDUCERS = combineReducers(APP_REDUCERS);
  store.replaceReducer(COMBINED_REDUCERS);
};

const getAppReducer = () => {
  return COMBINED_REDUCERS;
};

export { getAppReducer };
