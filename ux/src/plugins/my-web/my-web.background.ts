import { MyWebSnippetsModal } from "./components/form/modal";
import { IPluginService, IPluginServiceRequest } from "../../app/app.services";
import { MYWEB_PLUGIN_NAME } from "../my-web/my-web.constants";

interface IServiceMethod<T, A> {
  (args: A): T;
}
const methods: Record<string, Function> = {};

const addMessageListener = <T, A>(
  methodName: string,
  method: (args: A) => T
) => {
  methods[methodName] = method;
};

const registerMessageHandler = () => {
  chrome.runtime.onMessage.addListener(
    (
      request: IPluginServiceRequest,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void
    ) => {
      let method;
      if (request.name !== MYWEB_PLUGIN_NAME) return true;
      if (!(method = methods[request.method])) return sendResponse();

      try {
        (async () => {
          const result = await method(request.params);
          console.log(request, sender, result);
          sendResponse(result);
        })();
      } catch (e) {}
      // chrome.runtime.Port.disconnect();
      // indicates async wait for sendResponse
      return true;
    }
  );
};

const registerMenuActions = () => {
  // chrome.runtime.onInstalled.addListener(function () {
  //   chrome.browserAction.setBadgeText({ text: "L" });
  //   chrome.contextMenus.create({
  //     id: "read-later",
  //     title: "Add page to read later",
  //     contexts: ["selection"],
  //   });
  // });
};

/**
 * chrome.runtime.onMessage.addListener(function (message, callback) {
    if (message.data === "setAlarm") {
      chrome.alarms.create({ delayInMinutes: 5 });
    } else if (message.data === "runLogic") {
      chrome.tabs.executeScript({ file: "logic.js" });
    } else if (message.data === "changeColor") {
      chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="orange"',
      });
    }
  });
 * 
 */

const start = () => {
  addMessageListener("getAllSnippets", MyWebSnippetsModal.getJsonRecords);
  registerMessageHandler();
  registerMenuActions();

  // chrome.runtime.onSuspend.addListener(function () {
  //   chrome.browserAction.setBadgeText({ text: "D" });
  // });
};

const stop = () => {};

const service: IPluginService = {
  name: MYWEB_PLUGIN_NAME,
  start,
  stop,
};

export default service;
