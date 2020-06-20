import { createAction } from "@reduxjs/toolkit";
import { DASHBOARD_SET_DATA, DashboardType } from "./dashboard.types";

export const setDashBoardData = createAction(
  DASHBOARD_SET_DATA,
  (data: DashboardType) => ({
    payload: data,
  })
);
