import { createAction } from "@reduxjs/toolkit";
import { store } from "../../app";
import { push } from "connected-react-router";
import { IState, MYWEB_ROUTE_PATH, MYWEB_SET_DATA } from "./my-web.types";

export const setMyWebData = createAction(
  MYWEB_SET_DATA,
  (payload: IState): any => ({
    payload,
  })
);

export const setMyWebView = (view: IState) => {
  store.dispatch(setMyWebData(view));
  store.dispatch(push(MYWEB_ROUTE_PATH));
};
