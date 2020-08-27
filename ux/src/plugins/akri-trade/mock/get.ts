import { CRAWL_URL_REDIFF } from "../dashboard/index-list/rediff.load";
import { WebResponse } from "../../../app/common";

export interface WebResponseMock {
  default: WebResponse;
}
const response: { [key: string]: Promise<WebResponseMock> } = {
  allIndices: (import("../mock/allIndices") as unknown) as Promise<
    WebResponseMock
  >,
  "master-quote": (import("../mock/master-quote") as unknown) as Promise<
    WebResponseMock
  >,
  "option-chain-indices": (import(
    "../mock/option-chain-indices"
  ) as unknown) as Promise<WebResponseMock>,
  [CRAWL_URL_REDIFF]: (import("./rediff.index") as unknown) as Promise<
    WebResponseMock
  >,
};
export const getMockCrawlResponse = (
  url: string,
  exact: boolean = false
): Promise<WebResponseMock> => {
  return response[url]
    ? (response[url] as Promise<WebResponseMock>)
    : Promise.reject();
};

export const getMockResponse = (
  url: string,
  exact: boolean = false
): Promise<WebResponseMock> => {
  const objUrl = new URL(url);
  if (exact) {
    // match other params on file
  }
  const index: string = objUrl.pathname.split("/").pop() || "";
  return index
    ? (response[index] as Promise<WebResponseMock>)
    : Promise.reject();
};
