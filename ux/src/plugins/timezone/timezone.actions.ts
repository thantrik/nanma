import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, TimezoneType } from"./timezone.types";

export const setJsonViewData = createAction(SET_DATA, (data: TimezoneType) => ({
  payload: data,
}));
