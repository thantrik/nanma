import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";

import { getRoutes, store } from "./app";

import "./plugins/json";

const routes = getRoutes();

const App = (props: any) => (
  <Provider store={store}>
    <>
      <Router>
        <Switch>
          {routes.map((route, i) => (
            <Route path={route.path}>{route.component}</Route>
          ))}
        </Switch>
      </Router>
    </>
  </Provider>
);

ReactDOM.render(<App></App>, document.body);
