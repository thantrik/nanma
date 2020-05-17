import { combineReducers, Reducer } from "redux";

import { setJSONView } from"./awesome-links.actions";
import { createReducer } from "@reduxjs/toolkit";
import { AwesomeLinksType } from"./awesome-links.types";

interface IState {
  type: AwesomeLinksType;
}

const initialState = {
  type: "json",
};

const json: Reducer = createReducer(initialState, {
  [setJSONView as any]: (state, action) => ({ type: action.payload }),
});

export default json;
