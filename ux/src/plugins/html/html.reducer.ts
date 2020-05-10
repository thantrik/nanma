import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./html.actions";
import { createReducer } from "@reduxjs/toolkit";
import { HtmlType } from"./html.types";

interface IState {
  data: HtmlType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
