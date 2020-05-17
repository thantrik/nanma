import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, UnicodeType } from"./unicode.types";

export const setJsonViewData = createAction(SET_DATA, (data: UnicodeType) => ({
  payload: data,
}));
