import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, DashboardType } from"./dashboard.types";

export const setJsonViewData = createAction(SET_DATA, (data: DashboardType) => ({
  payload: data,
}));
