import code from "./code.reducer";
import route from "./code.routes";
import hook from "./code.hooks";
import { CODE_PLUGIN_NAME } from "./code.constants";

const config = {
  name: CODE_PLUGIN_NAME,
  route,
  reducer: code,
  hook,
};

export default config;
