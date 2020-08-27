import {
  AkriTradePropsType,
  AkriTradeStateType,
  DashboardType,
} from "../akri-trade.types";

import BaseComponent from "../../../components/base/component";
import NSEIndexList from "./index-list";
import OiChart from "./oi-chart";
import OptionChain from "./option-chain";
import React from "react";
import { fetchDashBoard } from "../akri-trade.actions";

enum IndexStatus {
  up = "up",
  down = "down",
}

interface Index {
  label: string;
  value: number;
  status: IndexStatus;
}

class AkriTradeDashboardView extends BaseComponent<
  AkriTradeStateType,
  AkriTradePropsType
> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentIndex: 0,
      dashboards: [NSEIndexList, OptionChain, OiChart],
    };
  }
  componentDidMount = async () => {
    import("../../../app/app.styles.css");
    import("./dashboard.styles.css");
    fetchDashBoard();
  };
  selectDashboard = (index: number) => (e: MouseEvent) => {
    this.setState({ currentIndex: index });
    e.preventDefault();
  };
  render() {
    const { data } = this.props;
    const { dashboards, currentIndex } = this.state;
    const Dashboard = dashboards[currentIndex].dashboard;
    return (
      <div className={"akri dashboard"}>
        <div className={"side-menu"}>
          {dashboards.map((item: DashboardType, index: number) => (
            <div
              onClick={
                this.selectDashboard(index) as () => (e: MouseEvent) => void
              }
            >
              <item.menu active={index === currentIndex}></item.menu>
            </div>
          ))}
        </div>
        <div className={"main-content"}>
          <Dashboard input={data}></Dashboard>
        </div>
      </div>
    );
  }
}

export { AkriTradeDashboardView };
