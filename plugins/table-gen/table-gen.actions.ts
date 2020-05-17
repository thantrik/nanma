import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, TableGenType } from"./table-gen.types";

export const setJsonViewData = createAction(SET_DATA, (data: TableGenType) => ({
  payload: data,
}));
