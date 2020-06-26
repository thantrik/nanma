import { IPluginService, IPluginServiceRequest } from "../../app/app.services";
import {
  JSON_PLUGIN_NAME,
  METHOD_GET_ALL_JSON_RECORDS,
} from "./json.constants";
import { JsonViewStore } from "./json.modal";

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
      if (request.name !== JSON_PLUGIN_NAME) return true;
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

const start = () => {
  addMessageListener(METHOD_GET_ALL_JSON_RECORDS, JsonViewStore.getAll);
  registerMessageHandler();
};

const stop = () => {};

const service: IPluginService = {
  name: JSON_PLUGIN_NAME,
  start,
  stop,
};

export default service;
