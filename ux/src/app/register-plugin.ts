import appReducer from "./app.reducer";
import { IPluginConfig, ReducerType } from "./app.types";
import { RegisterRoute } from "./../routes";
import { RegisterState } from "./app.reducer";
import { store } from "../store";
import { combineReducers, Reducer } from "redux";
import { createReducer } from "@reduxjs/toolkit";

const PLUGINS: Array<IPluginConfig> = [];

export const Register = (config: IPluginConfig) => {
  PLUGINS.push(config);
  RegisterRoute(config);
  RegisterState(PLUGINS);
};

export const getPlugins = () => PLUGINS;
