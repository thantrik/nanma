import { AWESOME_LINKS_PLUGIN_NAME } from "./awesome-links.constants";
import AwesomeLinks from "./awesome-links.reducer";
import { IPluginConfig } from "../../app/app.types";
import icon from "./awesome-links.icon";
import route from "./awesome-links.routes";

const config: IPluginConfig = {
  name: AWESOME_LINKS_PLUGIN_NAME,
  route,
  reducer: AwesomeLinks,
  icon,
};

export default config;
