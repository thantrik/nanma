import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./offline-doc.actions";
import { createReducer } from "@reduxjs/toolkit";
import { OfflineDocType } from"./offline-doc.types";

interface IState {
  data: OfflineDocType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
