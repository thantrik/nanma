import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./web-server.actions";
import { createReducer } from "@reduxjs/toolkit";
import { WebServerType } from"./web-server.types";

interface IState {
  data: WebServerType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
