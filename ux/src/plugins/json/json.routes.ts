import { JSON_ROUTE_PATH } from "./json.constants";
import { lazy } from "react";

export default {
  path: JSON_ROUTE_PATH,
  component: lazy(() => import("./json.connected")),
};
