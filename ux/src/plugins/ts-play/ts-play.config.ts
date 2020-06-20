import route from "./ts-play.routes";
import { IPluginConfig } from "../../app/app.types";
import { TS_PLAY_PLUGIN_NAME } from "./ts-play.constants";

const config: IPluginConfig = {
  name: TS_PLAY_PLUGIN_NAME,
  route,
};

export default config;
