import { AkriTradeStateType } from "../akri-trade.types";
import BaseComponent from "../../../components/base/component";
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
          {indexWidget(data?.[urls.allIndices.title])}
          <div
            style={{
              display: "flex",
            }}
          >
            <div style={{ width: 600, height: 400 }}></div>
            <div style={{ width: "calc(100% - 600px)", height: 500 }}></div>
          </div>
        </div>
      </div>
    );
  }
}

const indexWidget = (input: any = { data: [] }) => {
  const { data } = input;
  const list = [
    "NIFTY 50",
    "NIFTY NEXT 50",
    "NIFTY 100",
    "NIFTY 200",
    "NIFTY 500",
    "NIFTY MIDCAP 50",
    "NIFTY MIDCAP 100",
    "NIFTY SMALLCAP 100",
    "NIFTY BANK",
    "NIFTY METAL",
    "NIFTY PHARMA",
  ];
  return (
    <div className={"index-list"}>
      {data
        .filter((index: any) => list.indexOf(index.index) !== -1)
        .map((index: any) => {
          const change = index.last - index.open;
          return (
            <div
              key={index.index}
              className={"index-list-item"}
              //@ts-ignore
              status={change > 0 ? IndexStatus.up : IndexStatus.down}
            >
              <span className={"label"}>{index.index}</span>
              <span className={"value"} title={String(change)}>
                {index.last} ({Number(change).toFixed(1)})
              </span>
            </div>
          );
        })}
    </div>
  );
};

export { AkriTradeDashboardView };
