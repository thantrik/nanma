import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./prettier.actions";
import { createReducer } from "@reduxjs/toolkit";
import { PrettierType } from"./prettier.types";

interface IState {
  data: PrettierType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
