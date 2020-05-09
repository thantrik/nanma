import { createReducer, createAction } from "@reduxjs/toolkit";

const getAppConfig = createAction("GET_CONFIG");

const appReducer = createReducer(0, {
  [getAppConfig as any]: (state, action) => state,
});

export default appReducer;
