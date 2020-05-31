import screenCapture from "./screen-capture.reducer";
import route from "./screen-capture.routes";
import { IPluginConfig } from "../../app/app.types";
import icon from "./screen-capture.icon";
import { SCREEN_CAPTURE_PLUGIN_NAME } from "./screen-capture.constants";

const config: IPluginConfig = {
  name: SCREEN_CAPTURE_PLUGIN_NAME,
  route,
  reducer: screenCapture,
  icon,
};

export default config;
