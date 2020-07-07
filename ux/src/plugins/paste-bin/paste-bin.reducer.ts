import { Reducer } from "redux";
import { setPasteBinData } from "./paste-bin.actions";
import { createReducer } from "@reduxjs/toolkit";
import { IState } from "./paste-bin.types";

const initialState: IState = {
  data: [],
};

const pasteBin: Reducer = createReducer(initialState, {
  [setPasteBinData as any]: (state: IState, action) => ({ ...action.payload }),
});

export default pasteBin;
