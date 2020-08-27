import { WEB_REQUEST, isDev } from "../../../app/common/constants";

import { AKRI_TRADE_PLUGIN_NAME } from "../akri-trade.constants";
import { WebResponse } from "../../../app/common";

export const getWebData = async (
  url: string,
  options: any = {},
  exact: boolean = false
): Promise<WebResponse> => {
  const request = {
    name: AKRI_TRADE_PLUGIN_NAME,
    method: WEB_REQUEST,
    params: {
      input: url,
      init: {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        referrer: "www1.nseindia.com",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        ...options,
      },
    },
  };
  if (isDev) {
    const { getMockResponse } = await import("../mock/get");
    return await getMockResponse(url, exact).then((module) => {
      console.log("Fetching mock", url);
      return (module.default as unknown) as WebResponse;
    });
  }
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(request, (response: WebResponse) => {
      isDev && console.log("Response", response);
      if (response.ok) resolve(response);
      else reject(response);
    });
  });
};
