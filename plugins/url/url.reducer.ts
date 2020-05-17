import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./url.actions";
import { createReducer } from "@reduxjs/toolkit";
import { UrlType } from"./url.types";

interface IState {
  data: UrlType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
