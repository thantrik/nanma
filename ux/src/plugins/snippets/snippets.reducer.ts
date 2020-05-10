import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./snippets.actions";
import { createReducer } from "@reduxjs/toolkit";
import { SnippetsType } from"./snippets.types";

interface IState {
  data: SnippetsType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
