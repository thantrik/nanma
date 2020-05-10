import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, WebServerType } from"./web-server.types";

export const setJsonViewData = createAction(SET_DATA, (data: WebServerType) => ({
  payload: data,
}));
