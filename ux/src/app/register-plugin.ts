import appReducer from "../store/appReducers";
import { IPluginConfig, ReducerType } from "./app.types";
import { RegisterRoute } from "./../routes";
import { store } from "../store";
import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";

const PLUGINS: Array<IPluginConfig> = [];

export const createAppReducer = (): ReducerType => {
  const appReducers: ReducerType = { app: appReducer };
  PLUGINS.forEach((plugin) => (appReducers[plugin.name] = plugin.reducer));
  return appReducers;
};

export const Register = (config: IPluginConfig) => {
  PLUGINS.push(config);
  RegisterRoute(config);
  store.replaceReducer(combineReducers(createAppReducer()));
};
