import { createAction } from "@reduxjs/toolkit";
import { store } from "../../app";
import { push } from "connected-react-router";
import { SET_DATA } from "./json.types";
import { IState } from "./json.types";

export const setJSON = createAction(SET_DATA, (payload: IState): any => ({
  payload,
}));

export const setJsonView = (view: IState) => {
  store.dispatch(setJSON(view));
  store.dispatch(push("/json"));
};
