import "./react-app-env.d.ts";

import { context } from "./app";
import initAppView from "./app/view";
import { setAkriTradeViewRoute } from "./plugins/akri-trade/akri-trade.actions";

if (
  context.isExtension ||
  context.isGithub ||
  (process.env.NODE_ENV !== "production" && context.isLocalHost)
)
  initAppView(undefined, async () => {
    setAkriTradeViewRoute();
    if (context?.isExtension) {
      await require("./app/app.styles.css");
      if (context.isLocalHost)
        if (context.isExtension || context.isGithub) {
          window.document.body.classList.add("no-scroll");
          //  setJsonViewRoute();
          setAkriTradeViewRoute();
        }
    }
  });

import("./modules/contents");
