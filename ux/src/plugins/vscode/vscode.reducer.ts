import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./vscode.actions";
import { createReducer } from "@reduxjs/toolkit";
import { VscodeType } from"./vscode.types";

interface IState {
  data: VscodeType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
