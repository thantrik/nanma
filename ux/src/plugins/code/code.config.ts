import { CODE_PLUGIN_NAME } from "./code.constants";
import code from "./code.reducer";
import hook from "./code.hooks";
import icon from "./code.icon";
import route from "./code.routes";

const config = {
  name: CODE_PLUGIN_NAME,
  route,
  reducer: code,
  hook,
  icon,
};

export default config;
