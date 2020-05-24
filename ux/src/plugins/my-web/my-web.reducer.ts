import { Reducer } from "redux";
import { setMyWebData } from"./my-web.actions";
import { createReducer } from "@reduxjs/toolkit";
import { IState } from"./my-web.types";

const initialState: IState = {
  data: "{}",
};

const myWeb: Reducer = createReducer(initialState, {
  [setMyWebData as any]: (state, action) => ({ ...action.payload }),
});

export default myWeb;
