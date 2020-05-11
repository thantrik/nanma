import { combineReducers, Reducer } from "redux";

import { setJSONView } from "./json.actions";
import { createReducer } from "@reduxjs/toolkit";
import { JsonType } from "./json.types";

interface IState {
  type: JsonType;
}

const initialState = {
  type: "json",
};

const json: Reducer = createReducer(initialState, {
  [setJSONView as any]: (state, action) => ({ type: action.payload }),
});

export default json;
