import { IPluginRoute } from "../routes";
import { Reducer } from "redux";

export interface IPluginConfig {
  readonly name: string;
  readonly route: IPluginRoute;
  readonly reducer: Reducer;
}

export type ReducerType = { [key: string]: Reducer };
