import dashboard from "./dashboard.reducer";
import route from "./dashboard.routes";
import hook from "./dashboard.hooks";
import { IPluginConfig } from "../../app/app.types";
import { DASHBOARD_PLUGIN_NAME } from "./dashboard.constants";

const config: IPluginConfig = {
  name: DASHBOARD_PLUGIN_NAME,
  route,
  reducer: dashboard,
  hook: hook,
};

export default config;
