import "./react-app-env.d.ts";
import { context } from "./app";
import initAppView from "./app/view";
import { setJsonViewRoute } from "./plugins/json/json.actions";

if (
  context.isExtension ||
  context.isGithub ||
  (process.env.NODE_ENV !== "production" && context.isLocalHost)
)
  initAppView(undefined, async () => {
    if (context?.isExtension) {
      await require("./app/app.styles.css");
      if (context.isExtension || context.isGithub) {
        window.document.body.classList.add("no-scroll");
        setJsonViewRoute();
      }
    }
  });

import("./modules/contents");
