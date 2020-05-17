import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, MyWebType } from"./my-web.types";

export const setJsonViewData = createAction(SET_DATA, (data: MyWebType) => ({
  payload: data,
}));
