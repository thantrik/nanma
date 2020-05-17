import dashboard from "./dashboard.reducer";
import route from "./dashboard.routes";
import hook from "./dashboard.hooks";
import { IPluginConfig } from "../../app/app.types";

const config: IPluginConfig = {
  name: "dashboard",
  route,
  reducer: dashboard,
  hook: hook,
};

export default config;
