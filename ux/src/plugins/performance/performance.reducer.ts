import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./performance.actions";
import { createReducer } from "@reduxjs/toolkit";
import { PerformanceType } from"./performance.types";

interface IState {
  data: PerformanceType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
