import {
  createAction,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { push } from "connected-react-router";
import { SET_DATA, AwesomeLinksType } from"./awesome-links.types";

export const setJSONView = (dispatch: Dispatch) => {
  dispatch(
    createAction(SET_DATA, (type: AwesomeLinksType) => ({
      payload: type,
    }))
  );
  dispatch(push("/json"));
};

//@ts-ignore
window.setJSONView = setJSONView;
