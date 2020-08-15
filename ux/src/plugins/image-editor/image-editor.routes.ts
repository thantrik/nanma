import { IMAGE_EDITOR_ROUTE } from "./image-editor.constants";
import { lazy } from "react";

export default {
  path: IMAGE_EDITOR_ROUTE,
  component: lazy(() => import("./image-editor.connected")),
};
