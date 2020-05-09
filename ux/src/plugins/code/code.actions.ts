import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, CodeType } from "./code.types";

export const setJsonViewData = createAction(SET_DATA, (data: CodeType) => ({
  payload: data,
}));
