import {
  FetchParseInfo,
  IPluginService,
  IPluginServiceRequest,
} from "../../app/app.services";

import { WEB_PARSER } from "./constants";

const registerWebCrawlParserHandler = () => {
  chrome.runtime.onMessage.addListener(
    async (
      request: IPluginServiceRequest,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void
    ) => {
      if (request.method !== WEB_PARSER) return true;
      console.log(WEB_PARSER, request.name);
      try {
        const { input, init, selector } = request.params as FetchParseInfo;
        const response: Response = await fetch(input, init);
        const headers: Record<string, string> = {};
        response.headers.forEach((value: string, key: string) => {
          headers[key] = value;
        });
        let html = "";
        let error = false;
        try {
          html = await response.text();
        } catch (e) {
          error = true;
        }

        if (selector) {
          const cheerio = await import("cheerio");
          const $ = cheerio.load(html);
          html = $(selector).html() || "";
        }

        const { ok, status, statusText, type, url } = response;
        sendResponse({
          ...response,
          headers,
          html,
          ok,
          status,
          statusText,
          type,
          url,
          error,
        });
      } catch (e) {
        console.error(WEB_PARSER, request.name, e);
      }
      // chrome.runtime.Port.disconnect();
      // indicates async wait for sendResponse
      return true;
    }
  );
};

const start = () => {
  registerWebCrawlParserHandler();
};

const stop = () => {};

const service: IPluginService = {
  name: WEB_PARSER,
  start,
  stop,
};

export default service;
