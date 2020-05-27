import { default as MyWebService } from "../plugins/my-web/my-web.background";

export interface IPluginService {
  start: () => void;
  stop: () => void;
}

export interface IPluginServiceRequest {
  name: string;
  method: string;
  params?: object;
}

const services: Readonly<IPluginService>[] = [];

export const RegisterService = (service: IPluginService) => {
  services.push(service);
};
services.push(MyWebService);

export const getRegisteredServices = () => services;
