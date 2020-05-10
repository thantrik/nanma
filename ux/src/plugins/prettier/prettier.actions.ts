import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, PrettierType } from"./prettier.types";

export const setJsonViewData = createAction(SET_DATA, (data: PrettierType) => ({
  payload: data,
}));
