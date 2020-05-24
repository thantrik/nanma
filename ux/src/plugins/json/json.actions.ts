import { createAction } from "@reduxjs/toolkit";
import { store } from "../../app";
import { push } from "connected-react-router";
import { IState, JSON_ROUTE_NAME, JSON_SET_DATA } from "./json.types";

export const setJsonData = createAction(
  JSON_SET_DATA,
  (payload: IState): any => ({
    payload,
  })
);

export const setJsonView = (view: IState) => {
  store.dispatch(setJsonData(view));
  store.dispatch(push(JSON_ROUTE_NAME));
};
