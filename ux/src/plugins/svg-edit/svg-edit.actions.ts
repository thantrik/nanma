import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, SvgEditType } from"./svg-edit.types";

export const setJsonViewData = createAction(SET_DATA, (data: SvgEditType) => ({
  payload: data,
}));
