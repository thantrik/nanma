import { Reducer } from "redux";
import { setScreenCaptureData } from"./screen-capture.actions";
import { createReducer } from "@reduxjs/toolkit";
import { IState } from"./screen-capture.types";

const initialState: IState = {
  data: "{}",
};

const screenCapture: Reducer = createReducer(initialState, {
  [setScreenCaptureData as any]: (state, action) => ({ ...action.payload }),
});

export default screenCapture;
