import json from "./json.reducer";
import route from "./json.routes";
import hook from "./json.hooks";
import { IPluginConfig } from "../../app/app.types";
import icon from "./json.icon";
import { JSON_ROUTE_NAME } from "./json.constants";

const config: IPluginConfig = {
  name: JSON_ROUTE_NAME,
  route,
  reducer: json,
  hook: hook,
  icon,
};

export default config;
