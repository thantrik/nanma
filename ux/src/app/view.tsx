import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import { getRoutes, store, history } from "./index";
import { IPluginRoute } from "../routes";
import { IPluginConfig } from "./app.types";
import { ApplicationNavMenu } from "../components/menu/bottom";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import context from "./context";
import "../plugins/awesome-links";
import "../plugins/json";
import "../plugins/diff";
import "../plugins/md-editor";
import "../plugins/code";
import "../plugins/ts-play";
import "../plugins/color";

initializeIcons();

// const bundleLoad = Promise.all(
//   [
//     "awesome-links",
//     "json",
//     "diff",
//     "md-editor",
//     "code",
//     "ts-play",
//   ].map((plugin: string) => { import(`../plugins/${plugin}`).catch(console.error))
// );

const App = ({ config }: any) => {
  const routes = getRoutes();
  const isRoot = (route: IPluginRoute) =>
    config
      ? config.route.path === route.path
      : route.path === "/" || route.path === "/dashboard";
  const createRouteComponent = (route: IPluginRoute, i: number) => (
    <Route
      key={`${route.path}-${i}`}
      path={route.path}
      component={route.component}
    ></Route>
  );
  let root = {
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
        {(context.isChromeExtension || context.isLocalHost) && (
          <ApplicationNavMenu />
        )}
      </ConnectedRouter>
    </Provider>
  );
};

const initializeView = async (config?: IPluginConfig) => {
  // await bundleLoad;
  ReactDOM.render(<App config={config}></App>, document.body);
  if (context?.isChromeExtension) {
    await require("./app.styles.css");
    window.document.body.classList.add("noscroll");
  }
};

export default initializeView;
