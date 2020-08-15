import { AWESOME_LINKS_ROUTE_PATH } from "./awesome-links.constants";
import { lazy } from "react";

export default {
  path: AWESOME_LINKS_ROUTE_PATH,
  component: lazy(() => import("./awesome-links.connected")),
};
