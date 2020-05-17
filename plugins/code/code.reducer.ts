import { combineReducers, Reducer, Dispatch } from "redux";

import { setCodeView } from "./code.actions";
import { createReducer } from "@reduxjs/toolkit";
import { CodeType } from "./code.types";

interface IState {
  data: CodeType;
}

const initialState = {
  language: "typescript",
};

const code: Reducer = createReducer(initialState, {
  [setCodeView as any]: (state, action) => ({ language: action.payload }),
});

export default code;
