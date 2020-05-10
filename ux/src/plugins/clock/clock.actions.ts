import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, JsonType } from "./clock.types";

export const setJsonViewData = createAction(SET_DATA, (data: JsonType) => ({
  payload: data,
}));
