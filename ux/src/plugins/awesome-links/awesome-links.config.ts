import json from "./awesome-links.reducer";
import route from "./awesome-links.routes";

import { IPluginConfig } from "../../app/app.types";

const config: IPluginConfig = {
  name: "awesome-links",
  route,
  reducer: json,
};

export default config;
