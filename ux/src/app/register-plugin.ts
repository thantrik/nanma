//import appReducer from "./app.reducer";
import { IPluginConfig, PluginStartupHook } from "./app.types";
import { RegisterRoute } from "./../routes";
import { RegisterState } from "./app.reducer";
import { RegisterService } from "./app.services";
// import { store } from "../store";
// import { combineReducers, Reducer } from "redux";
// import { createReducer } from "@reduxjs/toolkit";

const PLUGINS: Array<IPluginConfig> = [];
const HOOKS: Array<PluginStartupHook> = [];

export const Register = (config: IPluginConfig) => {
  if (config.hook && typeof config.hook === "function") {
    HOOKS.push(config.hook);
  }
  PLUGINS.push(config);
  RegisterRoute(config);
  RegisterState(PLUGINS);
  if (config.service) RegisterService(config.service);
};

export const getPlugins = () => PLUGINS;
export const getHooks = () => HOOKS;
