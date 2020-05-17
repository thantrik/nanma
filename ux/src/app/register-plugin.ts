import appReducer from "./app.reducer";
import { IPluginConfig, ReducerType, PluginStartupHook } from "./app.types";
import { RegisterRoute } from "./../routes";
import { RegisterState } from "./app.reducer";
import { store } from "../store";
import { combineReducers, Reducer } from "redux";
import { createReducer } from "@reduxjs/toolkit";

const PLUGINS: Array<IPluginConfig> = [];
const HOOKS: Array<PluginStartupHook> = [];

export const Register = (config: IPluginConfig) => {
  if (config.hook && typeof config.hook === "function") {
    HOOKS.push(config.hook);
  }
  PLUGINS.push(config);
  RegisterRoute(config);
  RegisterState(PLUGINS);
};

export const getPlugins = () => PLUGINS;
export const getHooks = () => HOOKS;
