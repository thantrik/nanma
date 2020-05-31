import { createAction } from "@reduxjs/toolkit";
import { store } from "../../app";
import { push } from "connected-react-router";
import { IState, SCREEN_CAPTURE_ROUTE, SCREEN_CAPTURE_SET_DATA } from"./screen-capture.types";

export const setScreenCaptureData = createAction(
  SCREEN_CAPTURE_SET_DATA,
  (payload: IState): any => ({
    payload,
  })
);

export const setScreenCaptureView = (view: IState) => {
  store.dispatch(setScreenCaptureData(view));
  store.dispatch(push(SCREEN_CAPTURE_ROUTE));
};
