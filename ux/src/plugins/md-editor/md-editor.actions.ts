import { store } from "../../app";
import { createAction } from "@reduxjs/toolkit";
import { SET_DATA } from "./md-editor.types";
import { IState } from "./md-editor.types";

export const setMdViewData = createAction(SET_DATA, (view: IState) => ({
  payload: view,
}));

export const setMdView = (data: string) => {
  store.dispatch(setMdViewData({ data, readOnly: true }));
};
