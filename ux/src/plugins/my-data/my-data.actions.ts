import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, MyDataType } from"./my-data.types";

export const setJsonViewData = createAction(SET_DATA, (data: MyDataType) => ({
  payload: data,
}));
