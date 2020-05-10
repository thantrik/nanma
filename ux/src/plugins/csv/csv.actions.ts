import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, CsvType } from"./csv.types";

export const setJsonViewData = createAction(SET_DATA, (data: CsvType) => ({
  payload: data,
}));
