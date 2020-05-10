import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./read-later.actions";
import { createReducer } from "@reduxjs/toolkit";
import { ReadLaterType } from"./read-later.types";

interface IState {
  data: ReadLaterType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
