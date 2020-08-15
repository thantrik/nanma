import { IState, JSON_ROUTE_PATH, JSON_SET_DATA } from "./json.types";

import { createAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { store } from "../../app";

export const setJsonData = createAction(
  JSON_SET_DATA,
  (payload: IState): any => ({
    payload,
  })
);

export const saveJson = (json: string) => {
  store.dispatch(
    setJsonData({
      data: json,
    })
  );
  window.localStorage.setItem("json", json);
};

export const setJsonView = (view: IState) => {
  store.dispatch(setJsonData(view));
  setJsonViewRoute();
};

export const setJsonViewRoute = () => store.dispatch(push(JSON_ROUTE_PATH));
