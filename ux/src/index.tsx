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

// plugins.map((plugin: string) => import(plugin));

const routes = getRoutes();

const App = (props: any) => {
  const isRoot = (route: IPluginRoute) =>
    route.path === "/" || route.path === "/";
  const createRouteComponent = (route: IPluginRoute, i: number) => (
    <Route
      key={route.path}
      path={route.path}
      component={route.component}
      exact={true}
    ></Route>
  );
  let root = routes.find(isRoot);
  const normalRoutes = routes
    .filter((route) => !isRoot(route))
    .map(createRouteComponent);
  if (!root) {
    root = { ...routes[0], path: "/" } as IPluginRoute;
  }
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          {normalRoutes}
          {root ? createRouteComponent(root, -1) : null}
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

const initializeView = () => ReactDOM.render(<App></App>, document.body);

const { location } = window;
//@ts-ignore
window.editorView = initializeView;
//@ts-ignore
window.push = (path: string) => {
  store.dispatch(push(path));
};
if (
  /^(chrome-extension:\/\/|http:\/\/localhost)/i.test(location.href) ||
  /thantrik\.github\.io/i.test(location.href)
) {
  initializeView();
}
