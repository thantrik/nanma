import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, PhotoEditType } from"./photo-edit.types";

export const setJsonViewData = createAction(SET_DATA, (data: PhotoEditType) => ({
  payload: data,
}));
