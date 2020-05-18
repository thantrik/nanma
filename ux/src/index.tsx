import "./react-app-env.d.ts";
import { initAppView, context } from "./app";

if (context.isChromeExtension || context.isGithub || context.isLocalHost)
  initAppView();

import("./content-scripts");
