import { IPluginService, IPluginServiceRequest } from "../../app/app.services";

import { IMAGE_EDITOR_ROUTE } from "../image-editor/image-editor.types";
import { SCREEN_CAPTURE_PLUGIN_NAME } from "./screen-capture.constants";

// window.scrollTo(0, window.scrollY +  window.innerHeight)
// window.document.body.scrollHeight

let id = 100;

const ScreenCapture = (callback: Function) => {
  //const imageData = [];

  // chrome.tabs.captureVisibleTab(function (screenshotUrl) {
  //   imageData.push(screenshotUrl);
  //   chrome.tabs.executeScript(
  //     {
  //       file: "scroll.js",
  //     },
  //     (result) => {
  //       console.log("Result File", result);
  //     }
  //   );
  // });

  //chrome.tabs.executeScript
  chrome.tabs.captureVisibleTab(function (screenshotUrl) {
    // chrome.tabs.executeScript(
    //   {
    //     code:
    //       "window.scrollTo(0, window.scrollY +  window.innerHeight); window.scrollY; window.innerHeight; ",
    //   },
    //   (result) => {
    //     console.log("Result", result);
    //   }
    // );
    var viewTabUrl = chrome.extension.getURL(
      `index.html?route=${IMAGE_EDITOR_ROUTE}&id=${id++}`
    );
    console.log("viewTabUrl", viewTabUrl);
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
      console.log(views);
      for (var i = 0; i < views.length; i++) {
        var view = views[i];
        console.log(
          "view.location.href === viewTabUrl",
          view.location.href,
          view.location.href === viewTabUrl
        );
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
      if (request.name !== SCREEN_CAPTURE_PLUGIN_NAME) return true;
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
