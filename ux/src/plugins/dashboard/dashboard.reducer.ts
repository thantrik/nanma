import { Reducer } from "redux";

import { setDashBoardData } from "./dashboard.actions";
import { createReducer } from "@reduxjs/toolkit";
import { IState } from "./dashboard.types";

const initialState: IState = {
  data: {},
};

const json: Reducer = createReducer(initialState, {
  [setDashBoardData as any]: (state: IState, action) => ({
    data: action.payload,
  }),
});

export default json;
