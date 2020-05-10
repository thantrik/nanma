import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, AwesomeLinksType } from"./awesome-links.types";

export const setJsonViewData = createAction(SET_DATA, (data: AwesomeLinksType) => ({
  payload: data,
}));
