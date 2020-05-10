import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./diff.actions";
import { createReducer } from "@reduxjs/toolkit";
import { DiffType } from"./diff.types";

interface IState {
  data: DiffType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
