import { store } from "../../app";
import { createAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { CODE_SET_DATA, IState } from "./code.types";
import { CODE_ROUTE_PATH } from "./code.constants";

export const setCodeViewAction = createAction(
  CODE_SET_DATA,
  (payload: IState): any => ({ payload })
);

export const setCodeView = (view: IState) => {
  store.dispatch(setCodeViewAction(view));
  store.dispatch(push(CODE_ROUTE_PATH));
};
