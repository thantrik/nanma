import json from "./json.reducer";
import route from "./json.routes";
import hook from "./json.hooks";
import { IPluginConfig } from "../../app/app.types";

const config: IPluginConfig = {
  name: "json",
  route,
  reducer: json,
  hook: hook,
};

export default config;
