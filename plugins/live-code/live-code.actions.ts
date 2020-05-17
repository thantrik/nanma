import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, LiveCodeType } from"./live-code.types";

export const setJsonViewData = createAction(SET_DATA, (data: LiveCodeType) => ({
  payload: data,
}));
