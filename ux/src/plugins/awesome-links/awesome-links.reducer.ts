import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./awesome-links.actions";
import { createReducer } from "@reduxjs/toolkit";
import { AwesomeLinksType } from"./awesome-links.types";

interface IState {
  data: AwesomeLinksType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
