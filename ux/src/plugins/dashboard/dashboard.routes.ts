import { DASHBOARD_ROUTE_PATH } from "./dashboard.constants";
import { lazy } from "react";

export default {
  path: DASHBOARD_ROUTE_PATH,
  component: lazy(() => import("./dashboard.connected")),
};
