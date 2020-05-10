import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./photo-edit.actions";
import { createReducer } from "@reduxjs/toolkit";
import { PhotoEditType } from"./photo-edit.types";

interface IState {
  data: PhotoEditType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
