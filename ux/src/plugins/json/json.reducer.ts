import { IState } from "./json.types";
import { Reducer } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import { setJsonData } from "./json.actions";

const initialState: IState = {
  data: window.localStorage.getItem("json") || "{}",
};

const json: Reducer = createReducer(initialState, {
  [setJsonData as any]: (state: IState, action) => ({ ...action.payload }),
});

export default json;
