import { IPluginRoute } from "../routes";
import { Reducer } from "redux";
import { AppContext } from "./context";

export interface IPluginConfig {
  readonly name: string;
  readonly route: IPluginRoute;
  readonly reducer?: Reducer;
  readonly hook?: PluginStartupHook;
  readonly icon?: any;
  readonly service?: IPluginService;
}

export interface PluginStartupHook {
  (context: AppContext): void;
}

export type ReducerType = { [key: string]: Reducer };

export interface IPluginService {
  start: () => void;
  stop: () => void;
}
