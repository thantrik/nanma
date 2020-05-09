import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from "./json.actions";
import { createReducer } from "@reduxjs/toolkit";
import { JsonType } from "./json.types";

interface IState {
  data: JsonType;
}

const initialState = {
  data: {},
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default combineReducers(json);
