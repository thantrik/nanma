import color from "./color.reducer";
import route from "./color.routes";
import { IPluginConfig } from "../../app/app.types";
import icon from "./color.icon";
import { COLOR_PLUGIN_NAME } from "./color.constants";

const config: IPluginConfig = {
  name: COLOR_PLUGIN_NAME,
  route,
  reducer: color,
  icon,
};

export default config;
