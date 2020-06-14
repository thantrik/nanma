import { createAction } from "@reduxjs/toolkit";
import { store } from "../../app";
import { push } from "connected-react-router";
import { IState, IMAGE_EDITOR_ROUTE, IMAGE_EDITOR_SET_DATA } from"./image-editor.types";

export const setImageEditorData = createAction(
  IMAGE_EDITOR_SET_DATA,
  (payload: IState): any => ({
    payload,
  })
);

export const setImageEditorView = (view: IState) => {
  store.dispatch(setImageEditorData(view));
  store.dispatch(push(IMAGE_EDITOR_ROUTE));
};
