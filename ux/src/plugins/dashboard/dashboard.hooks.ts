import { store, AppContext } from "../../app";
import { push } from "connected-react-router";
import config from "./dashboard.config";

const hook = (context: AppContext) => {
  if (context.isHTML()) return;
  if (context.isChromeExtension || context.isGithub || context.isLocalHost) {
    context.setDOMOwner(config);
    store.dispatch(push("/dashboard"));
  }
};

export default hook;
