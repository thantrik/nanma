export * from "./dashboard.constants";
export type DashboardType = { [key: string]: any } | string;

export interface IState {
  data: DashboardType;
}
