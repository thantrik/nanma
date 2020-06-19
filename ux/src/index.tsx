import "./react-app-env.d.ts";
import { context } from "./app";
import initAppView from "./app/view";

//@ts-ignore
window.initView = () => console.log("test", context);

if (
  context.isExtension ||
  context.isGithub ||
  (process.env.NODE_ENV !== "production" && context.isLocalHost)
)
  initAppView();

import("./modules/contents");
