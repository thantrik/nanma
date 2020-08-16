import { WebResponse } from "../../app/common/services";

export * from "./akri-trade.constants";

export interface AkriTradeStateType {
  data: Record<string, WebResponse>;
}
