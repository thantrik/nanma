import json from "./json.reducer";
import route from "./json.routes";
import hook from "./json.hooks";
import { IPluginConfig } from "../../app/app.types";
import icon from "./json.icon";

const config: IPluginConfig = {
  name: "json",
  route,
  reducer: json,
  hook: hook,
  icon,
};

export default config;