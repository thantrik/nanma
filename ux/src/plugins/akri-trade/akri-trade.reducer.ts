import { setAkriTradeData, setAkriWebReqData } from "./akri-trade.actions";

import { AKRI_TRADE_PLUGIN_NAME } from "./akri-trade.constants";
import { AkriTradeStateType } from "./akri-trade.types";
import { Reducer } from "redux";
import { createReducer } from "@reduxjs/toolkit";

const getInitialState = (): AkriTradeStateType => {
  try {
    const data = window.localStorage.getItem(AKRI_TRADE_PLUGIN_NAME);
    if (data) return JSON.parse(data) as AkriTradeStateType;
  } catch (e) {}
  return {} as AkriTradeStateType;
};

const initialState: AkriTradeStateType = {
  ...getInitialState(),
};

const akriTrade: Reducer = createReducer(initialState, {
  [setAkriTradeData as any]: (
    state: any,
    action: any
  ): Partial<AkriTradeStateType> => ({
    ...state,
    ...action.payload,
  }),
  [setAkriWebReqData as any]: (state: any, action): any => ({
    ...state,
    data: {
      ...state.data,
      [action.payload.url.title]: action.payload.data,
    },
  }),
});

export default akriTrade;
