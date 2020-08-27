import { WEB_PARSER, isDev } from "../../../app/common/constants";

import { AKRI_TRADE_PLUGIN_NAME } from "../akri-trade.constants";
import { WebResponse } from "../../../app/common";

export const getWebCrawlHtml = async (
  url: string,
  options: any = {},
  exact: boolean = false
): Promise<WebResponse> => {
  const request = {
    name: AKRI_TRADE_PLUGIN_NAME,
    method: WEB_PARSER,
    params: {
      input: url,
      init: {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        referrer: "www.akri.com",
        headers: {
          "Content-Type": "text/html",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        ...options,
      },
    },
  };

  if (isDev) {
    const { getMockCrawlResponse } = await import("../mock/get");
    return await getMockCrawlResponse(url, exact).then((module) => {
      console.log("Fetching crawl mock", url);
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
