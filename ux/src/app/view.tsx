import { Provider, ReactReduxContextValue } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import { push, ConnectedRouter } from "connected-react-router";
import { getRoutes, store, history, getPlugins } from "./index";
import { IPluginRoute } from "../routes";
import { IPluginConfig } from "./app.types";
import context from "./context";

const bundleLoad = Promise.all(
  [
    "awesome-links",
    "json",
    "diff",
    "md-editor",
    "code",
    "dashboard",
  ].map((plugin: string) => import(`../plugins/${plugin}`).catch(console.error))
);

const App = ({ config }: any) => {
  const routes = getRoutes();
  const isRoot = (route: IPluginRoute) =>
    config
      ? config.route.path == route.path
      : route.path === "/" || route.path === "/dashboard";
  const createRouteComponent = (route: IPluginRoute, i: number) => (
    <Route
      key={`${route.path}-${i}`}
      path={route.path}
      component={route.component}
    ></Route>
  );
  let root = {
    ...routes[routes.length - 1],
    ...routes.find(isRoot),
    path: "/*",
  } as IPluginRoute;
  const normalRoutes = routes.map(createRouteComponent);
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          {normalRoutes}
          {root ? createRouteComponent(root, 10000) : null}
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

const initializeView = async (config?: IPluginConfig) => {
  await bundleLoad;
  ReactDOM.render(<App config={config}></App>, document.body);
};

export default initializeView;
