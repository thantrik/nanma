import { Reducer } from "redux";
import { setJsonData } from "./json.actions";
import { createReducer } from "@reduxjs/toolkit";
import { IState } from "./json.types";

const initialState: IState = {
  data: "{}",
};

const json: Reducer = createReducer(initialState, {
  [setJsonData as any]: (state: IState, action) => ({ ...action.payload }),
});

export default json;
