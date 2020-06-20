import symbols from "./symbols.reducer";
import route from "./symbols.routes";
import { IPluginConfig } from "../../app/app.types";
import icon from "./symbols.icon";
import { SYMBOLS_PLUGIN_NAME } from "./symbols.constants";

const config: IPluginConfig = {
  name: SYMBOLS_PLUGIN_NAME,
  route,
  reducer: symbols,
  icon,
};

export default config;
