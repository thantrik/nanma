import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, PerformanceType } from"./performance.types";

export const setJsonViewData = createAction(SET_DATA, (data: PerformanceType) => ({
  payload: data,
}));
