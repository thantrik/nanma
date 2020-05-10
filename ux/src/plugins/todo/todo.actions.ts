import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { SET_DATA, TodoType } from"./todo.types";

export const setJsonViewData = createAction(SET_DATA, (data: TodoType) => ({
  payload: data,
}));
