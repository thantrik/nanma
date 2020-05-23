import { RouteComponentProps } from "react-router-dom";
import { IPluginConfig } from "../app/app.types";
const ROUTES: Array<IPluginRoute> = [];

export interface IPluginRoute {
  path: string;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  routes?: IPluginRoute[];
}

export const RegisterRoute = (config: IPluginConfig) => {
  const { route } = config;
  const parentRoute = ROUTES.find((r) => route.path.indexOf(r.path) === 0);
  if (parentRoute && parentRoute.routes) {
    parentRoute.routes.push(route);
  } else ROUTES.push(route);
};

export const getRoutes = (): ReadonlyArray<IPluginRoute> => ROUTES;
