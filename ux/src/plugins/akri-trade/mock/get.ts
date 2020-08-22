import { WebResponse } from "../../../app/common/services";

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
};
export const getMockResponse = (url: string): Promise<WebResponseMock> => {
  const index: string = url.split("/").pop() || "";
  return index
    ? (response[index] as Promise<WebResponseMock>)
    : Promise.reject();
};
