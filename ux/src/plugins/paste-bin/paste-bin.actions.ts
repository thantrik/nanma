import { createAction } from "@reduxjs/toolkit";
import { store } from "../../app";
import { push } from "connected-react-router";
import { IState, PASTE_BIN_ROUTE_PATH, PASTE_BIN_SET_DATA } from"./paste-bin.types";

export const setPasteBinData = createAction(
  PASTE_BIN_SET_DATA,
  (payload: IState): any => ({
    payload,
  })
);

export const setPasteBinView = (view: IState) => {
  store.dispatch(setPasteBinData(view));
  setPasteBinViewRoute();
};

export const setPasteBinViewRoute = () => store.dispatch(push(PASTE_BIN_ROUTE_PATH));
