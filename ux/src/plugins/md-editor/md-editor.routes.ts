// import { Layer } from "@fluentui/react";

import { MD_EDITOR_ROUTE_PATH } from "./md-editor.constants";
import { lazy } from "react";

export default {
  path: MD_EDITOR_ROUTE_PATH,
  component: lazy(() => import("./md-editor.connected")),
};
