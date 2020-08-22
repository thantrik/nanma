import {
  AKRI_TRADE_PLUGIN_NAME,
  SET_AKRI_WEB_REQ_DATA,
} from "./akri-trade.constants";
import {
  AKRI_TRADE_ROUTE_PATH,
  AKRI_TRADE_SET_DATA,
  AkriTradeStateType,
} from "./akri-trade.types";
import { DataUrl, urls } from "./trade-url";

import { WebResponse } from "../../app/common/services";
import { createAction } from "@reduxjs/toolkit";
import { getWebData } from "./request/nse";
import { push } from "connected-react-router";
import { store } from "../../app";

export const setAkriTradeData = createAction(
  AKRI_TRADE_SET_DATA,
  (payload: Partial<AkriTradeStateType>): any => ({
    payload,
  })
);

interface WebRequestData {
  url: DataUrl;
  data: WebResponse;
}
export const setAkriWebReqData = createAction(
  SET_AKRI_WEB_REQ_DATA,
  (payload: WebRequestData): any => ({
    payload,
  })
);

export const saveAkriTrade = (akriTrade: Partial<AkriTradeStateType>) => {
  store.dispatch(setAkriTradeData(akriTrade));
  window.localStorage.setItem(
    AKRI_TRADE_PLUGIN_NAME,
    JSON.stringify(akriTrade)
  );
};

export const setAkriTradeViewRoute = () =>
  store.dispatch(push(AKRI_TRADE_ROUTE_PATH));

export const getIndices = async () => {
  const response = await getWebData(urls.allIndices.url);
  store.dispatch(
    setAkriWebReqData({
      url: urls.allIndices,
      data: response,
    })
  );
};

export const getOptionChain = async () => {
  const response = await getWebData(urls.optionChain.url);
  store.dispatch(
    setAkriWebReqData({
      url: urls.optionChain,
      data: response,
    })
  );
};

//let intervalHandle: NodeJS.Timeout;
export const fetchDashBoard = () => {
  // if (typeof intervalHandle !== "undefined") return;
  // intervalHandle = setInterval(() => {
  getIndices();
  getOptionChain();
  //  }, 1000);
};
