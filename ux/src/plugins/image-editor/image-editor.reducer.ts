import { Reducer } from "redux";
import { setImageEditorData } from "./image-editor.actions";
import { createReducer } from "@reduxjs/toolkit";
import { IState } from "./image-editor.types";

const initialState: IState = {
  imageSrc: "",
};

const imageEditor: Reducer = createReducer(initialState, {
  [setImageEditorData as any]: (state, action) => ({ ...action.payload }),
});

export default imageEditor;
