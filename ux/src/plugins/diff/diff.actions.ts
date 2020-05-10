import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, DiffType } from"./diff.types";

export const setJsonViewData = createAction(SET_DATA, (data: DiffType) => ({
  payload: data,
}));
