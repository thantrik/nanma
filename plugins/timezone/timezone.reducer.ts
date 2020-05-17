import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./timezone.actions";
import { createReducer } from "@reduxjs/toolkit";
import { TimezoneType } from"./timezone.types";

interface IState {
  data: TimezoneType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
