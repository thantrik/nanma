import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./github.actions";
import { createReducer } from "@reduxjs/toolkit";
import { GithubType } from"./github.types";

interface IState {
  data: GithubType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
