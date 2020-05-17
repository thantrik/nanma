import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, GithubType } from"./github.types";

export const setJsonViewData = createAction(SET_DATA, (data: GithubType) => ({
  payload: data,
}));
