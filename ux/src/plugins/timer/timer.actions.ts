import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, TimerType } from"./timer.types";

export const setJsonViewData = createAction(SET_DATA, (data: TimerType) => ({
  payload: data,
}));
