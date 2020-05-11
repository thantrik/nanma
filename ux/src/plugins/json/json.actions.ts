import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { push } from "connected-react-router";
import { SET_DATA, JsonType } from "./json.types";

export const setJSONView = (dispatch: Dispatch) => {
  dispatch(
    createAction(SET_DATA, (type: JsonType) => ({
      payload: type,
    }))
  );
  dispatch(push("/json"));
};

//@ts-ignore
window.setJSONView = setJSONView;
