import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, SnippetsType } from"./snippets.types";

export const setJsonViewData = createAction(SET_DATA, (data: SnippetsType) => ({
  payload: data,
}));
