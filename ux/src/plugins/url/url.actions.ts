import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, UrlType } from"./url.types";

export const setJsonViewData = createAction(SET_DATA, (data: UrlType) => ({
  payload: data,
}));
