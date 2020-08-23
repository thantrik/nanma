import React, { useEffect } from "react";

import { DashboardComponentProps } from "../../akri-trade.types";
import { WebResponse } from "../../../../app/common/services";
import { urls } from "../../trade-url";

enum IndexStatus {
  up = "up",
  down = "down",
}

interface Index {
  label: string;
  value: number;
  status: IndexStatus;
}

export interface NSEIndexListProps {
  input: { json: { data: any[] } };
}

const defaultData: WebResponse = { json: { data: [] } } as WebResponse;

export const NSEIndexList = ({
  input = { [urls.allIndices.title]: defaultData },
}: DashboardComponentProps) => {
  const { data } = input[urls.allIndices.title]?.json;

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

  useEffect(() => {
    import("./index-list.styles.css");
  });

  if (!input) return null;
  return (
    <div className={"index-list"}>
      {data
        .filter((index: any) => list.indexOf(index.index) !== -1)
        .map((indexData: any) => {
          const {
            previousClose,
            percentChange,
            index,
            variation,
            last,
            oneWeekAgo,
            oneMonthAgo,
            oneYearAgo,
            //perChange365d,
            chart365dPath,
            chartTodayPath,
            chart30dPath,
          } = indexData;
          const changeLastDay = Number(previousClose - last).toFixed(1);
          const changeOneWeekAgo = Number(oneWeekAgo - last).toFixed(1);
          const changeOneMonthAgo = Number(oneMonthAgo - last).toFixed(1);
          const changeOneYearAgo = Number(oneYearAgo - last).toFixed(1);

          const getStatus = (val: number | string) =>
            Number(val) > 0 ? IndexStatus.up : IndexStatus.down;

          return (
            <div
              key={index}
              className={"index-list-item"}
              data-status={getStatus(percentChange)}
            >
              <span className={"label"}>
                {index.replace("NIFTY", "N")} ({Number(variation).toFixed(1)})
                <div>
                  <div className={"graph"}>
                    <img src={chartTodayPath} alt={"Today"}></img>
                    <img src={chart30dPath} alt={"Month"}></img>
                    <img src={chart365dPath} alt={"Year"}></img>
                  </div>
                  <div className={"past"} title={String(variation)}>
                    <span data-status={getStatus(changeLastDay)}>
                      D {changeLastDay}
                    </span>
                    <span data-status={getStatus(changeOneWeekAgo)}>
                      W {changeOneWeekAgo}
                    </span>
                    <span data-status={getStatus(changeOneMonthAgo)}>
                      M {changeOneMonthAgo}
                    </span>
                    <span data-status={getStatus(changeOneYearAgo)}>
                      Y {changeOneYearAgo}
                    </span>
                  </div>
                </div>
              </span>
              <span className={"value"} title={String(variation)}>
                {last}
              </span>
            </div>
          );
        })}
    </div>
  );
};
