import {
  FetchInfo,
  IPluginService,
  IPluginServiceRequest,
} from "../../app/app.services";

import { WEB_REQUEST } from "./constants";

const registerWebRequestHandler = () => {
  chrome.runtime.onMessage.addListener(
    async (
      request: IPluginServiceRequest,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void
    ) => {
      if (request.method !== WEB_REQUEST) return true;
      console.log(WEB_REQUEST, request.name);
      try {
        const { input, init } = request.params as FetchInfo;
        const response: Response = await fetch(input, init);
        const headers: Record<string, string> = {};
        response.headers.forEach((value: string, key: string) => {
          headers[key] = value;
        });
        let json,
          text = "";
        const contentType = response.headers.get("content-type");
        let error = false;
        if (response.ok && contentType?.indexOf("json") !== -1) {
          try {
            json = await response.json();
          } catch (e) {
            error = true;
          }
        }
        try {
          if (!json) {
            text = await response.text();
          }
        } catch (e) {
          error = true;
        }

        const {
          body,
          ok,
          redirected,
          status,
          statusText,
          trailer,
          type,
          url,
        } = response;
        sendResponse({
          ...response,
          headers,
          text,
          json,
          body,
          ok,
          redirected,
          status,
          statusText,
          trailer,
          type,
          url,
          error,
        });
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
  name: WEB_REQUEST,
  start,
  stop,
};

export default service;
