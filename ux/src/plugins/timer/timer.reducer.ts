import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./timer.actions";
import { createReducer } from "@reduxjs/toolkit";
import { TimerType } from"./timer.types";

interface IState {
  data: TimerType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
