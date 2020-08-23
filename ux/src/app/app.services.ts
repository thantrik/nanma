import { WebCrawlParserService, WebRequestService } from "./common";

import { default as MyWebService } from "../plugins/my-web/my-web.background";
import { default as ScreenShotService } from "../plugins/screen-capture/screen-capture.services";

export interface IPluginService {
  name: string;
  start: () => void;
  stop: () => void;
}

export interface IPluginServiceRequest {
  name: string;
  method: string;
  params?: object | FetchInfo | FetchParseInfo;
}

export interface FetchInfo {
  input: RequestInfo;
  init?: RequestInit;
}

export interface FetchParseInfo extends FetchInfo {
  selector: string;
}

const services: Readonly<IPluginService>[] = [];

export const RegisterService = (service: IPluginService) => {
  services.push(service);
};
services.push(MyWebService);
services.push(ScreenShotService);
services.push(WebRequestService);
services.push(WebCrawlParserService);

export const getRegisteredServices = () => services;
