import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, RichTextType } from"./rich-text.types";

export const setJsonViewData = createAction(SET_DATA, (data: RichTextType) => ({
  payload: data,
}));
