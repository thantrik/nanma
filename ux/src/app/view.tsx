import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter, push } from "connected-react-router";
import { getRoutes, store, history } from "./index";
import { IPluginRoute } from "../routes";
import { IPluginConfig } from "./app.types";
import { ApplicationNavMenu } from "../components/menu/bottom";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import context from "./context";
import "./app.plugins";
import { setJsonViewRoute } from "../plugins/json/json.actions";
initializeIcons();

const getRequestRoute = () => {
  const url = new URL(window.location.href);
  const params = url?.searchParams;
  return params.get("route");
};

// config will be sent from hooks to indecate current DOM owner.
// that view need to be rendered
const App = ({ config }: { config?: IPluginConfig }) => {
  // If chrome plugin requested a route via url from background scripts
  // eg: screen capture and request route image-editor
  const reqRoute = context.isChromeExtension && getRequestRoute();
  const routes = getRoutes();
  const isSpecificRoute = (route: IPluginRoute) =>
    config
      ? config.route.path === route.path
      : route.path === (reqRoute || "/");
  const createRouteComponent = (
    route?: IPluginRoute,
    i: number | string = "root"
  ) =>
    route ? (
      <Route
        key={`${route.path}-${i}`}
        path={route.path}
        component={route.component}
      ></Route>
    ) : null;
  let specificRoute = routes.find(isSpecificRoute);

  const normalRoutes = routes
    .filter((route) => !isSpecificRoute(route))
    .map(createRouteComponent);
  const otherRoutes = () => <React.Fragment>{normalRoutes}</React.Fragment>;
  const hasSpecificRoute = !!(reqRoute || config?.route) && !!specificRoute;
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          {hasSpecificRoute
            ? createRouteComponent(specificRoute)
            : otherRoutes()}
        </Switch>
        {(context.isAnyOf3() || !isSpecificRoute) && <ApplicationNavMenu />}
      </ConnectedRouter>
    </Provider>
  );
};

const initializeView = async (config?: IPluginConfig) => {
  // await bundleLoad;
  ReactDOM.render(<App config={config}></App>, document.body, async () => {
    if (context?.isChromeExtension) {
      await require("./app.styles.css");
      window.document.body.classList.add("noscroll");
      setJsonViewRoute();
    }
  });
};

//@ts-ignore
window.push = push;

export default initializeView;
