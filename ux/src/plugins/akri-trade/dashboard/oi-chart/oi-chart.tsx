import { defaultData, nextThursday } from "../option-chain/option-chain.types";

import DarkUnica from "highcharts/themes/dark-unica";
import { DashboardComponentProps } from "../../akri-trade.types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";
import { urls } from "../../trade-url";

export const OiChart = ({
  input = { [urls.optionChain.title]: defaultData },
}: DashboardComponentProps) => {
  const {
    records: {
      //  expiryDates = [],
      data = [],
      //   strikePrices = [],
      //   underlyingValue,
    } = defaultData.json.records,
    // filtered: { data: filterdData = [] },
  } = (input[urls.optionChain.title] ?? defaultData)?.json || defaultData.json;
  let storedFilteredData = window.localStorage.getItem("OI_FILTERED");
  let filteredData = data;
  try {
    if (storedFilteredData) {
      filteredData = JSON.parse(storedFilteredData);
    }
  } catch (e) {}

  const chartData = generateChartData(filteredData, nextThursday());
  return createOiChart(chartData);
};

interface Range {
  from: number;
  to: number;
}

interface Series {
  [key: string]: number[];
}

const generateChartData = (
  data: any[],
  expiryDate: string,
  range: Range = { from: 0, to: Infinity }
) => {
  const categories = new Set();
  const series: Series = {
    CE: [],
    PE: [],
  };
  const oiChange: Series = {
    "◭CE": [],
    "◭PE": [],
  };
  const change: Series = {
    "◭CE": [],
    "◭PE": [],
  };

  const buySell: Series = {
    "CE(B)": [],
    "CE(S)": [],
    "PE(B)": [],
    "PE(S)": [],
  };

  data
    .filter(
      (r: any) =>
        r.expiryDate === expiryDate &&
        r.strikePrice >= range.from &&
        r.strikePrice <= range.to
    )
    .forEach((r: any): void => {
      const defaultVal = {
        openInterest: 0,
        totalBuyQuantity: 0,
        totalSellQuantity: 0,
        pchangeinOpenInterest: 0,
        changeinOpenInterest: 0,
        totalTradedVolume: 0,
        pChange: 0,
        change: 0,
      };

      const { CE = defaultVal, PE = defaultVal, strikePrice } = r;
      categories.add(strikePrice);
      series["CE"].push(CE.openInterest);
      series["PE"].push(PE.openInterest);

      buySell["CE(B)"].push(CE.totalBuyQuantity);
      buySell["PE(B)"].push(PE.totalBuyQuantity);

      buySell["CE(S)"].push(CE.totalSellQuantity);
      buySell["PE(S)"].push(PE.totalSellQuantity);

      oiChange["◭PE"].push(PE.pchangeinOpenInterest);
      oiChange["◭CE"].push(CE.pchangeinOpenInterest);
      change["◭CE"].push(CE.change);
      change["◭PE"].push(PE.change);
    });
  const getSeries = (
    series: Series,
    axis: number = 0,
    type: string = "column"
  ) =>
    Object.keys(series).map((key: string) => {
      return {
        name: key,
        data: series[key],
        yAxis: axis,
        type,
      };
    });
  return {
    expiryDate,
    categories: [...categories],
    series: [
      ...getSeries(series, 0, "column"),
      ...getSeries(buySell, 1, "spline"),
      ...getSeries(oiChange, 2, "spline"),
      ...getSeries(change, 3, "spline"),
    ],
  };
};

const createOiChart = (chartData: any) => {
  const options = {
    chart: {
      zoomType: "xy",
      style: { fontSize: "7px" },
      height: "600px",
    },

    title: {
      text: `Open interest ${chartData.expiryDate}`,
    },
    xAxis: {
      categories: chartData.categories,
      crosshair: true,
      type: "number",
      style: { fontSize: "6px" },
      legend: {
        title: {
          style: { fontSize: "6px" },
        },
      },
    },
    // yAxis: {
    //   crosshair: true,
    //   min: 0,
    //   title: {
    //     text: "Lots",
    //   },
    // },
    yAxis: [
      {
        // Option interest
        labels: {
          formatter: function (): string {
            //@ts-ignore
            return this.value / 1000 + "K";
          },
          style: {
            color: Highcharts.getOptions().colors?.[1],
            fontSize: "6px",
          },
        },
        title: {
          text: "IO",
          style: {
            color: Highcharts.getOptions().colors?.[1],
            fontSize: "6px",
          },
        },
      },
      {
        // Buy Sell
        gridLineWidth: 0,
        title: {
          text: "B/S",
          style: {
            color: Highcharts.getOptions().colors?.[2],
            fontSize: "6px",
          },
        },
        labels: {
          formatter: function (): string {
            //@ts-ignore
            return this.value / 100000 + "L";
          },
          style: {
            color: Highcharts.getOptions().colors?.[2],
            fontSize: "6px",
          },
        },
      },

      {
        // Option interest delta
        gridLineWidth: 0,
        title: {
          text: "◭ OI",
          style: {
            color: Highcharts.getOptions().colors?.[3],
            fontSize: "6px",
          },
        },
        labels: {
          format: "◭ {value}",
          style: {
            color: Highcharts.getOptions().colors?.[3],
            fontSize: "6px",
          },
        },
        opposite: true,
      },
      {
        // Change axis
        gridLineWidth: 0,
        title: {
          text: "◭ CHNG",
          style: {
            color: Highcharts.getOptions().colors?.[4],
            fontSize: "6px",
          },
        },
        labels: {
          format: "◭ {value}",
          style: {
            color: Highcharts.getOptions().colors?.[4],
            fontSize: "6px",
          },
        },
        opposite: true,
      },
    ],

    tooltip: {
      headerFormat: '<span style="font-size:7px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="font-size:6px;color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="font-size:6px;padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    series: chartData.series,
  };
  return (
    <HighchartsReact
      highcharts={DarkUnica(Highcharts)}
      options={options}
    ></HighchartsReact>
  );
};
