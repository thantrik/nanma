import myWeb from "./my-web.reducer";
import route from "./my-web.routes";
import hook from "./my-web.hooks";
import { IPluginConfig } from "../../app/app.types";
import icon from "./my-web.icon";
import { MYWEB_PLUGIN_NAME } from "./my-web.constants";
import service from "./my-web.background";
import context from "../../app/context";

const config: IPluginConfig = {
  name: MYWEB_PLUGIN_NAME,
  route: context.isExtension ? route : undefined,
  reducer: myWeb,
  hook: hook,
  icon,
  service,
};

export default config;
