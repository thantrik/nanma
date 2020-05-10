import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./md-editor.actions";
import { createReducer } from "@reduxjs/toolkit";
import { MdEditorType } from"./md-editor.types";

interface IState {
  data: MdEditorType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
