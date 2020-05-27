import { IPluginService } from "./app.types";
import { default as MyWebService } from "../plugins/my-web/my-web.background";

const services: Readonly<IPluginService>[] = [];

export const RegisterService = (service: IPluginService) => {
  services.push(service);
};
services.push(MyWebService);

export const getRegisteredServices = () => services;
