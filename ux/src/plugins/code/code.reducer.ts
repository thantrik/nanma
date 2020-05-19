import { combineReducers, Reducer, Dispatch } from "redux";

import { setCodeViewAction } from "./code.actions";
import { createReducer } from "@reduxjs/toolkit";
import { CodeType, IState } from "./code.types";

const initialState: IState = {
  data: "",
  language: "typescript",
  url: "",
};

const code: Reducer = createReducer<IState>(initialState, {
  [setCodeViewAction as any]: (state, action) => {
    return { ...state, ...action.payload };
  },
});

export default code;
