import { Reducer } from "redux";

import { setDashBoardData } from "./dashboard.actions";
import { createReducer } from "@reduxjs/toolkit";
import { DashboardType } from "./dashboard.types";

interface IState {
  data: DashboardType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setDashBoardData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
