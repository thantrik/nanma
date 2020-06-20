import { store, AppContext, setDOMOwner } from "../../app";
import { push } from "connected-react-router";
import config from "./dashboard.config";
import { DASHBOARD_ROUTE_PATH } from "./dashboard.constants";

const hook = (context: AppContext) => {
  if (context.isHTML()) return;
  if (context.isExtension || context.isGithub || context.isLocalHost) {
    setDOMOwner(config, () => store.dispatch(push(DASHBOARD_ROUTE_PATH)));
  }
};

export default hook;
