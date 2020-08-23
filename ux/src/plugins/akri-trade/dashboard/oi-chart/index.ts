import { DashboardType } from "../../akri-trade.types";
import { OiChart } from "./oi-chart";
import { OiChartMenu } from "./oi-chart.menu";

const DashboardConfig: DashboardType = {
  menu: OiChartMenu,
  dashboard: OiChart,
};

export default DashboardConfig;
