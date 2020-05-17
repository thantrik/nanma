import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./gifmaker.actions";
import { createReducer } from "@reduxjs/toolkit";
import { GifmakerType } from"./gifmaker.types";

interface IState {
  data: GifmakerType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
