import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./rich-text.actions";
import { createReducer } from "@reduxjs/toolkit";
import { RichTextType } from"./rich-text.types";

interface IState {
  data: RichTextType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
