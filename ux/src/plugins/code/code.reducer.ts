import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from "./code.actions";
import { createReducer } from "@reduxjs/toolkit";
import { CodeType } from "./code.types";

interface IState {
  data: CodeType;
}

const initialState = {
  data: "function(){}",
};

const code: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default code;
