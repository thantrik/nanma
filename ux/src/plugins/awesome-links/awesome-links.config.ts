import AwesomeLinks from "./awesome-links.reducer";
import route from "./awesome-links.routes";

import { IPluginConfig } from "../../app/app.types";
import { AWESOME_LINKS_PLUGIN_NAME } from "./awesome-links.constants";

const config: IPluginConfig = {
  name: AWESOME_LINKS_PLUGIN_NAME,
  route,
  reducer: AwesomeLinks,
};

export default config;
