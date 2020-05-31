import { IPluginService, IPluginServiceRequest } from "../../app/app.services";
import { SCREEN_CAPTURE_PLUGIN_NAME } from "./screen-capture.constants";

var id = 100;

const ScreenCapture = (callback: Function) => {
  chrome.tabs.captureVisibleTab(function (screenshotUrl) {
    var viewTabUrl = chrome.extension.getURL("screenshot.html?id=" + id++);
    var targetId: any = null;

    chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
      // We are waiting for the tab we opened to finish loading.
      // Check that the tab's id matches the tab we opened,
      // and that the tab is done loading.
      if (tabId !== targetId || changedProps.status !== "complete") return;

      // Passing the above test means this is the event we were waiting for.
      // There is nothing we need to do for future onUpdated events, so we
      // use removeListner to stop getting called when onUpdated events fire.
      chrome.tabs.onUpdated.removeListener(listener);

      // Look through all views to find the window which will display
      // the screenshot.  The url of the tab which will display the
      // screenshot includes a query parameter with a unique id, which
      // ensures that exactly one view will have the matching URL.
      var views = chrome.extension.getViews();
      for (var i = 0; i < views.length; i++) {
        var view = views[i];
        if (view.location.href === viewTabUrl) {
          // @ts-ignore
          view.setScreenshotUrl(screenshotUrl);
          break;
        }
      }
      callback && callback({ views });
    });

    chrome.tabs.create({ url: viewTabUrl }, function (tab) {
      targetId = tab.id;
    });
  });
};

const registerScreenShotHandler = () => {
  chrome.runtime.onMessage.addListener(
    (
      request: IPluginServiceRequest,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void
    ) => {
      if (request.name !== SCREEN_CAPTURE_PLUGIN_NAME) return sendResponse();
      try {
        ScreenCapture((result: any) => {
          sendResponse(result);
        });
      } catch (e) {}
      // chrome.runtime.Port.disconnect();
      // indicates async wait for sendResponse
      return true;
    }
  );
};

const start = () => {
  registerScreenShotHandler();
};

const stop = () => {};

const service: IPluginService = {
  name: SCREEN_CAPTURE_PLUGIN_NAME,
  start,
  stop,
};

export default service;
