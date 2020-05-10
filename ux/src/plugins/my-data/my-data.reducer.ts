import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./my-data.actions";
import { createReducer } from "@reduxjs/toolkit";
import { MyDataType } from"./my-data.types";

interface IState {
  data: MyDataType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
