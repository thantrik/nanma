import { createAction } from "@reduxjs/toolkit";
import { store } from "../../app";
import { push } from "connected-react-router";
import {
  IState,
  PASTE_BIN_ROUTE_PATH,
  PASTE_BIN_SET_DATA,
} from "./paste-bin.types";
import {
  PASTE_BIN_GET_ALL_DOCUMENTS,
  PASTE_BIN_SAVE_DOCUMENT,
  PASTE_BIN_DELETE_DOCUMENT,
} from "./paste-bin.constants";

export const setPasteBinData = createAction(
  PASTE_BIN_SET_DATA,
  (payload: IState): any => ({
    payload,
  })
);

export const setPasteBinView = (view: IState) => {
  store.dispatch(setPasteBinData(view));
  setPasteBinViewRoute();
};

export const setPasteBinViewRoute = () =>
  store.dispatch(push(PASTE_BIN_ROUTE_PATH));

export const getAllDocumentsAction = createAction(PASTE_BIN_GET_ALL_DOCUMENTS);
export const saveDocumentAction = createAction(
  PASTE_BIN_SAVE_DOCUMENT,
  (payload: Document): any => ({
    payload,
  })
);

export const deleteDocumentAction = createAction(
  PASTE_BIN_DELETE_DOCUMENT,
  (payload: string): any => ({
    payload,
  })
);

export const getAllDocuments = () => {
  store.dispatch(getAllDocumentsAction());
};
export const saveDocument = async (updateDoc: Document) => {
  store.dispatch(saveDocumentAction(updateDoc));
};

export const deleteDocument = (id: string) => {
  store.dispatch(deleteDocumentAction(id));
};
