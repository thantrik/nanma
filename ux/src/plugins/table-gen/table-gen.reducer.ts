import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./table-gen.actions";
import { createReducer } from "@reduxjs/toolkit";
import { TableGenType } from"./table-gen.types";

interface IState {
  data: TableGenType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
