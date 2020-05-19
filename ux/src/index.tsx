import "./react-app-env.d.ts";
import { initAppView, context } from "./app";

if (
  context.isChromeExtension ||
  context.isGithub ||
  (process.env.NODE_ENV !== "production" && context.isLocalHost)
)
  initAppView();

import("./content-scripts");
