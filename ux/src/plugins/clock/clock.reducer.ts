import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from "./clock.actions";
import { createReducer } from "@reduxjs/toolkit";
import { JsonType } from "./clock.types";

interface IState {
  data: JsonType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
