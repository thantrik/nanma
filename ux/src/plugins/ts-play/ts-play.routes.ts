import { TS_PLAY_ROUTE_PATH } from "./ts-play.constants";
import { lazy } from "react";

export default {
  path: TS_PLAY_ROUTE_PATH,
  component: lazy(() => import("./ts-play.connected")),
};
