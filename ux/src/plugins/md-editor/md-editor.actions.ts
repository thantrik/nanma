import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, MdEditorType } from "./md-editor.types";

export const setJsonViewData = createAction(SET_DATA, (data: MdEditorType) => ({
  payload: data,
}));
