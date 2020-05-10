import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./my-web.actions";
import { createReducer } from "@reduxjs/toolkit";
import { MyWebType } from"./my-web.types";

interface IState {
  data: MyWebType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
