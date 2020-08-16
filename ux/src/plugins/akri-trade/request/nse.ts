// import { AKRI_TRADE_PLUGIN_NAME } from "../akri-trade.constants";
// import { WEB_REQUEST } from "../../../app/common/constants";

import { WebResponse } from "../../../app/common/services";

export const getWebData = (
  url: string,
  options: any = {}
): Promise<WebResponse> => {
  //   const request = {
  //     name: AKRI_TRADE_PLUGIN_NAME,
  //     method: WEB_REQUEST,
  //     params: {
  //       input: url,
  //       init: {
  //         method: "GET",
  //         mode: "cors",
  //         cache: "no-cache",
  //         credentials: "same-origin",
  //         referrer: "www1.nseindia.com",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         redirect: "follow",
  //         referrerPolicy: "no-referrer",
  //         ...options,
  //       },
  //     },
  //   };
  return import("../mock/all-indices").then((module) => {
    return (module.default as unknown) as WebResponse;
  });
  //   return new Promise((resolve, reject) => {
  //     chrome.runtime.sendMessage(request, (response: WebResponse) => {
  //       console.log("Response", response);
  //       if (response.ok) resolve(response);
  //       else reject(response);
  //     });
  //   });
};
