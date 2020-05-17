import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { push } from "connected-react-router";
import { SET_DATA, CodeType } from "./code.types";

export const setCodeView = (dispatch: Dispatch) => {
  dispatch(
    createAction(SET_DATA, (language: CodeType) => ({
      payload: language,
    }))
  );
  dispatch(push("/code"));
};

//@ts-ignore
window.setCodeView = setCodeView;
