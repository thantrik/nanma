import pasteBin from "./paste-bin.reducer";
import route from "./paste-bin.routes";
import { IPluginConfig } from "../../app/app.types";
import icon from "./paste-bin.icon";
import { PASTE_BIN_PLUGIN_NAME } from "./paste-bin.constants";

const config: IPluginConfig = {
  name: PASTE_BIN_PLUGIN_NAME,
  route,
  reducer: pasteBin,
  icon,
};

export default config;
