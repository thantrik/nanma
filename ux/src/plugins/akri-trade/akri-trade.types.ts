import { WebResponse } from "../../app/common/services";

export * from "./akri-trade.constants";

export interface DashboardType {
  menu: (props: any) => JSX.Element;
  dashboard: (props: any) => JSX.Element | null;
}

export type AkriTradePropsType = AkriTradeDataType;

export interface DashboardComponentProps {
  input: Record<string, WebResponse>;
}
export interface AkriTradeDataType {
  data: Record<string, WebResponse>;
}
export interface AkriTradeStateType {
  dashboards: DashboardType[];
  currentIndex: number;
}
