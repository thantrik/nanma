import { lazy } from "react";

export default {
  path: "/color",
  component: lazy(() => import("./color.connected")),
};
