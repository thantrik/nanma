import { AKRI_TRADE_ROUTE_PATH } from "./akri-trade.constants";
import { lazy } from "react";

export default {
  path: AKRI_TRADE_ROUTE_PATH,
  component: lazy(() => import("./akri-trade.connected")),
};
