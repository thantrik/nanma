import { store } from "../../app";
import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { push } from "connected-react-router";
import { SET_DATA, CodeType, IState } from "./code.types";

export const setCodeViewAction = createAction(
  SET_DATA,
  (payload: IState): any => ({ payload })
);

export const setCodeView = (view: IState) => {
  store.dispatch(setCodeViewAction(view));
  store.dispatch(push("/code"));
};
