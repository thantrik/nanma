import { context, AppContext } from "../../app";
import { setMyWebView } from "./my-web.actions";
import config from "./my-web.config";

const myWebView = (data: string, parse = false) => {
  context.setDOMOwner(config);
  setMyWebView({ data });
};

const hook = (context: AppContext) => {
  // check all domains match
  if (/\.(myWeb)$/i.test(window.location.href)) {
    myWebView(window.location.href);
  }
};

export default hook;
