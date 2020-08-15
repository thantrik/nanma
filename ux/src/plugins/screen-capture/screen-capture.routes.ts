import { SCREEN_CAPTURE_ROUTE } from "./screen-capture.constants";
import { lazy } from "react";

export default {
  path: SCREEN_CAPTURE_ROUTE,
  component: lazy(() => import("./screen-capture.connected")),
};
