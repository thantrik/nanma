import { createAction } from "@reduxjs/toolkit";
import { store } from "../../app";
import { push } from "connected-react-router";
import {
  JSON_ROUTE_PATH,
  JSON_SET_DATA,
  IJsonStoredRecord,
  IJsonDataType,
} from "./json.types";
import {
  JSON_PLUGIN_NAME,
  METHOD_GET_ALL_JSON_RECORDS,
  JSON_SET_RECORDS,
} from "./json.constants";
import { JsonViewStore } from "./json.modal";

export const setJsonData = createAction(
  JSON_SET_DATA,
  (payload: IJsonDataType): any => ({
    payload,
  })
);

export const getSavedJsonRecords = () =>
  chrome.runtime.sendMessage(
    {
      name: JSON_PLUGIN_NAME,
      method: METHOD_GET_ALL_JSON_RECORDS,
    },
    function (response) {
      console.log("JSON records: ", response);
      setSavedJsonRecords(response);
    }
  );

export const setSavedJsonRecords = (records: IJsonStoredRecord[]) => {
  store.dispatch(SetSavedJsonRecordsToState(records));
};

export const SetSavedJsonRecordsToState = createAction(
  JSON_SET_RECORDS,
  (payload: IJsonStoredRecord[] = []): any => ({
    payload,
  })
);

export const saveJsonData = (record: IJsonStoredRecord) => {
  JsonViewStore.save(record);
  getSavedJsonRecords();
};

export const setJsonView = (view: IJsonDataType) => {
  store.dispatch(setJsonData(view));
  setJsonViewRoute();
};

export const setJsonViewRoute = () => store.dispatch(push(JSON_ROUTE_PATH));
