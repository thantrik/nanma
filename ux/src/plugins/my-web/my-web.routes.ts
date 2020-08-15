import { MYWEB_ROUTE_PATH } from "./my-web.constants";
import { lazy } from "react";

export default {
  path: MYWEB_ROUTE_PATH,
  component: lazy(() => import("./my-web.connected")),
};
