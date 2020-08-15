import { CODE_ROUTE_PATH } from "./code.constants";
import { lazy } from "react";

export default {
  path: CODE_ROUTE_PATH,
  component: lazy(() => import("./code.connected")),
};
