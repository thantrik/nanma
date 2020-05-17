import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, IconMakerType } from"./icon-maker.types";

export const setJsonViewData = createAction(SET_DATA, (data: IconMakerType) => ({
  payload: data,
}));
