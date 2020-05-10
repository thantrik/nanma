import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./dashboard.actions";
import { createReducer } from "@reduxjs/toolkit";
import { DashboardType } from"./dashboard.types";

interface IState {
  data: DashboardType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
