import { IPluginRoute } from "../routes";
import { Reducer } from "redux";
import { AppContext } from "./context";
import { IPluginService } from "./app.services";

export interface IPluginConfigBase {
  readonly name: string;
}

export interface IPluginConfig extends IPluginConfigBase {
  readonly route?: IPluginRoute;
  readonly reducer?: Reducer;
  readonly hook?: PluginStartupHook;
  readonly icon?: any;
  readonly service?: IPluginService;
}

export interface PluginStartupHook {
  (context: AppContext): void;
}

export type ReducerType = { [key: string]: Reducer };
