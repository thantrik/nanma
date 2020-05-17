import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, HtmlType } from"./html.types";

export const setJsonViewData = createAction(SET_DATA, (data: HtmlType) => ({
  payload: data,
}));
