import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./svg-edit.actions";
import { createReducer } from "@reduxjs/toolkit";
import { SvgEditType } from"./svg-edit.types";

interface IState {
  data: SvgEditType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
