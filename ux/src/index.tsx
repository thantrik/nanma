import { Provider, ReactReduxContextValue } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import { push, ConnectedRouter } from "connected-react-router";
import { getRoutes, store, history } from "./app";
import { IPluginRoute } from "./routes";

import "./plugins/md-editor";
import "./plugins/json";
import "./plugins/code";
import "./plugins/dashboard";

// plugins.map((plugin: string) => import(plugin));

const routes = getRoutes();

const App = (props: any) => {
  const isRoot = (route: IPluginRoute) =>
    route.path === "/" || route.path === "/dashboard";
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

const initializeView = () => ReactDOM.render(<App></App>, document.body);

const { location } = window;
//@ts-ignore
window.initializeView = initializeView;
//@ts-ignore
window.push = (path: string) => {
  store.dispatch(push(path));
};
//@ts-ignore
window.__dispatch = store.dispatch;

const isChromeExtension = /^chrome-extension:\/\//i.test(location.href);

const isLocalHost = /^http:\/\/localhost/i.test(location.href);
const isGithub = /thantrik\.github\.io/i.test(location.href);

if (process?.env?.NODE_ENV === "development" || isChromeExtension || isGithub) {
  initializeView();
}

import(
  /* webpackPrefetch: true */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  /* webpackChunkName: "content-scripts" */ "./content-scripts"
);
