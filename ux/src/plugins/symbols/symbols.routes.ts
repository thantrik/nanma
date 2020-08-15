import { SYMBOLS_ROUTE_PATH } from "./symbols.constants";
import { lazy } from "react";

export default {
  path: SYMBOLS_ROUTE_PATH,
  component: lazy(() => import("./symbols.connected")),
};
