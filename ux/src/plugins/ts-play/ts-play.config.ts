import { IPluginConfig } from "../../app/app.types";
import { TS_PLAY_PLUGIN_NAME } from "./ts-play.constants";
import icon from "./ts-play.icon";
import route from "./ts-play.routes";

const config: IPluginConfig = {
  name: TS_PLAY_PLUGIN_NAME,
  route,
  icon,
};

export default config;
