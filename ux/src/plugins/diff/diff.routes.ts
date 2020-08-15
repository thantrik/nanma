import { DIFF_ROUTE_PATH } from "./diff.constants";
import { lazy } from "react";

export default {
  path: DIFF_ROUTE_PATH,
  component: lazy(() => import("./diff.connected")),
};
