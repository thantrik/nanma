import { DashboardType } from "../../akri-trade.types";
import { NSEOptionChain } from "./option-chain";
import { OptionChainMenu } from "./option-chain.menu";

export * from "./option-chain.urls";

const DashboardConfig: DashboardType = {
  menu: OptionChainMenu,
  dashboard: NSEOptionChain,
};

export default DashboardConfig;
