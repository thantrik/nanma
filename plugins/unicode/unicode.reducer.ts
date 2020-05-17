import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./unicode.actions";
import { createReducer } from "@reduxjs/toolkit";
import { UnicodeType } from"./unicode.types";

interface IState {
  data: UnicodeType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
