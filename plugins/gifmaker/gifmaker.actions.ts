import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, GifmakerType } from"./gifmaker.types";

export const setJsonViewData = createAction(SET_DATA, (data: GifmakerType) => ({
  payload: data,
}));
