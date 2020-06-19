import { store, AppContext, setDOMOwner } from "../../app";
import { push } from "connected-react-router";
import config from "./dashboard.config";

const hook = (context: AppContext) => {
  if (context.isHTML()) return;
  if (context.isExtension || context.isGithub || context.isLocalHost) {
    setDOMOwner(config);
    store.dispatch(push("/dashboard"));
  }
};

export default hook;
