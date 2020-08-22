import { AkriTradeStateType } from "../akri-trade.types";
import BaseComponent from "../../../components/base/component";
import { NSEIndexList } from "./index-list";
import { NSEOptionChain } from "./option-chain";
import React from "react";
import { fetchDashBoard } from "../akri-trade.actions";
import { urls } from "../trade-url";

enum IndexStatus {
  up = "up",
  down = "down",
}

interface Index {
  label: string;
  value: number;
  status: IndexStatus;
}

class AkriTradeDashboardView extends BaseComponent<any, AkriTradeStateType> {
  componentDidMount = async () => {
    import("../../../app/app.styles.css");
    import("./dashboard.styles.css");
    fetchDashBoard();
  };
  render() {
    const { data } = this.props;
    return (
      <div className={"akri dashboard"}>
        <div className={"side-menu"}></div>
        <div className={"main-content"}>
          {/** INDECES VIEW */}
          <NSEIndexList input={data?.[urls.allIndices.title]}></NSEIndexList>
          <NSEOptionChain
            input={data?.[urls.optionChain.title]}
          ></NSEOptionChain>
          {/* <div
            style={{
              display: "flex",
            }}
          >
            <div style={{ width: 600, height: 400 }}></div>
            <div style={{ width: "calc(100% - 600px)", height: 500 }}></div>
          </div> */}
        </div>
      </div>
    );
  }
}

export { AkriTradeDashboardView };
