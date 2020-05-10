import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./csv.actions";
import { createReducer } from "@reduxjs/toolkit";
import { CsvType } from"./csv.types";

interface IState {
  data: CsvType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
