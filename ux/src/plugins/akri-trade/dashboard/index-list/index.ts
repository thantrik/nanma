import { DashboardType } from "../../akri-trade.types";
import { IndexListMenu } from "./index-list.menu";
import { NSEIndexList } from "./index-list";

const DashboardConfig: DashboardType = {
  menu: IndexListMenu,
  dashboard: NSEIndexList,
};

export default DashboardConfig;
