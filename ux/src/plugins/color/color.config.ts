import json from "./color.reducer";
import route from "./color.routes";
import { IPluginConfig } from "../../app/app.types";
import icon from "./color.icon";

const config: IPluginConfig = {
  name: "color",
  route,
  reducer: json,
  icon,
};

export default config;
