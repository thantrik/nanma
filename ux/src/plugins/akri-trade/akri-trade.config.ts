import { AKRI_TRADE_PLUGIN_NAME } from "./akri-trade.constants";
import { IPluginConfig } from "../../app/app.types";
import akriTrade from "./akri-trade.reducer";
import icon from "./akri-trade.icon";
import route from "./akri-trade.routes";

const config: IPluginConfig = {
  name: AKRI_TRADE_PLUGIN_NAME,
  route,
  reducer: akriTrade,
  icon,
};

export default config;
