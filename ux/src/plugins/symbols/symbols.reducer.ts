import { Reducer } from "redux";
import { setSymbolsData } from "./symbols.actions";
import { createReducer } from "@reduxjs/toolkit";
import { IState } from "./symbols.types";

const initialState: IState = {
  data: "⭐",
};

const symbols: Reducer = createReducer(initialState, {
  [setSymbolsData as any]: (state: IState, action) => ({ ...action.payload }),
});

export default symbols;
