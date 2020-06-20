import { createAction } from "@reduxjs/toolkit";
import { store } from "../../app";
import { push } from "connected-react-router";
import { IState, SYMBOLS_ROUTE_PATH, SYMBOLS_SET_DATA } from"./symbols.types";

export const setSymbolsData = createAction(
  SYMBOLS_SET_DATA,
  (payload: IState): any => ({
    payload,
  })
);

export const setSymbolsView = (view: IState) => {
  store.dispatch(setSymbolsData(view));
  setSymbolsViewRoute();
};

export const setSymbolsViewRoute = () => store.dispatch(push(SYMBOLS_ROUTE_PATH));
