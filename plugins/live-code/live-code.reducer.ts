import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./live-code.actions";
import { createReducer } from "@reduxjs/toolkit";
import { LiveCodeType } from"./live-code.types";

interface IState {
  data: LiveCodeType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
