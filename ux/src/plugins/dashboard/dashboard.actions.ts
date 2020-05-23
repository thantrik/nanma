import { createAction } from "@reduxjs/toolkit";
import { SET_DATA, DashboardType } from "./dashboard.types";

export const setDashBoardData = createAction(
  SET_DATA,
  (data: DashboardType) => ({
    payload: data,
  })
);
