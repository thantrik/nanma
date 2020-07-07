import { Reducer } from "redux";
import { setJsonData, SetSavedJsonRecordsToState } from "./json.actions";
import { createReducer } from "@reduxjs/toolkit";
import { IState } from "./json.types";

const initialState: IState = {
  data: "{}",
  //@ts-ignore
  records: [],
};

const json: Reducer = createReducer(initialState, {
  [setJsonData as any]: (state: IState, action) => ({
    ...state,
    ...action.payload,
  }),
  [SetSavedJsonRecordsToState as any]: (state: IState, action) => ({
    ...state,
    records: action.payload || [],
  }),
});

export default json;
