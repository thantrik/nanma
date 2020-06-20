import { store } from "../../app";
import { createAction } from "@reduxjs/toolkit";
import { IState } from "./md-editor.types";
import {
  MD_EDITOR_ROUTE_PATH,
  MD_EDITOR_SET_DATA,
} from "./md-editor.constants";
import { push } from "connected-react-router";

export const setMdViewData = createAction(
  MD_EDITOR_SET_DATA,
  (view: IState) => ({
    payload: view,
  })
);

export const setMdView = (data: string) => {
  store.dispatch(setMdViewData({ data, readOnly: true }));
  store.dispatch(push(MD_EDITOR_ROUTE_PATH));
};
