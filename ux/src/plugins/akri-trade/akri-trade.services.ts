import {
  FetchInfo,
  IPluginService,
  IPluginServiceRequest,
} from "../../app/app.services";

import { AKRI_TRADE_PLUGIN_NAME } from "../akri-trade/akri-trade.types";

const WEB_REQUEST = "WebRequest";

const registerWebRequestHandler = () => {
  chrome.runtime.onMessage.addListener(
    async (
      request: IPluginServiceRequest,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void
    ) => {
      console.log(WEB_REQUEST, request.name);
      try {
        const { input, init } = request.params as FetchInfo;
        const response: Response = await fetch(input, init);
        sendResponse(response);
      } catch (e) {
        console.error(WEB_REQUEST, request.name, e);
      }
      // chrome.runtime.Port.disconnect();
      // indicates async wait for sendResponse
      return true;
    }
  );
};

const start = () => {
  registerWebRequestHandler();
};

const stop = () => {};

const service: IPluginService = {
  name: AKRI_TRADE_PLUGIN_NAME,
  start,
  stop,
};

export default service;
