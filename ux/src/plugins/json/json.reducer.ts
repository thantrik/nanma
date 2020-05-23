import { Reducer } from "redux";
import { setJSON } from "./json.actions";
import { createReducer } from "@reduxjs/toolkit";
import { IState } from "./json.types";

const initialState: IState = {
  data: "{}",
};

const json: Reducer = createReducer(initialState, {
  [setJSON as any]: (state, action) => ({ ...action.payload }),
});

export default json;
