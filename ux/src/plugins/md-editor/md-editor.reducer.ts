import { combineReducers, Reducer } from "redux";

import { setMdViewData } from "./md-editor.actions";
import { createReducer } from "@reduxjs/toolkit";
import { MdEditorType, IState } from "./md-editor.types";

const initialState = {
  data: "",
  readOnly: false,
};

const mdEditor: Reducer = createReducer(initialState, {
  [setMdViewData as any]: (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  },
});

export default mdEditor;
