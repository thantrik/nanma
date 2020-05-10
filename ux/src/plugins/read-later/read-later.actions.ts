import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, ReadLaterType } from"./read-later.types";

export const setJsonViewData = createAction(SET_DATA, (data: ReadLaterType) => ({
  payload: data,
}));
