import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, OfflineDocType } from"./offline-doc.types";

export const setJsonViewData = createAction(SET_DATA, (data: OfflineDocType) => ({
  payload: data,
}));
