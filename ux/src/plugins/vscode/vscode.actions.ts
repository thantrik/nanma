import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, VscodeType } from"./vscode.types";

export const setJsonViewData = createAction(SET_DATA, (data: VscodeType) => ({
  payload: data,
}));
