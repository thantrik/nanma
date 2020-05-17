import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./icon-maker.actions";
import { createReducer } from "@reduxjs/toolkit";
import { IconMakerType } from"./icon-maker.types";

interface IState {
  data: IconMakerType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
