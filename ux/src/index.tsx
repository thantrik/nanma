import "./react-app-env.d.ts";
import { initAppView, context } from "./app";

if (context.isChromeExtension || context.isGithub) initAppView();

import("./content-scripts");
