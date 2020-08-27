import { WebResponse } from "../../../../app/common";
import moment from "moment";

export const optionPropsMap = [
  ["openInterest", "OI", "Open Interest in contracts"],
  ["changeinOpenInterest", "🜂OI", "Change in Open Interest (Contracts)"],
  ["pchangeinOpenInterest", "p🜂OI"],
  ["totalTradedVolume", "Vol", "Volume in Contracts"],
  ["impliedVolatility", "IV", "Implied Volatility"],
  ["lastPrice", "LTP", "Last Traded Price"],
  ["change", "🜂", "Change w.r.t to Previous Close"],
  ["pChange", "p🜂"],
  ["totalBuyQuantity", "T BUY", "Total Buy Qty"],
  ["totalSellQuantity", "T SELL", "Total Sell Qty"],
  ["bidQty", "QTY", "Best Bid/Buy Qty"],
  ["bidprice", "₹", "Best Bid/Buy Price"],
  ["askQty", "ASK QTY", "Best Ask/Sell Qty"],
  ["askPrice", "ASK ₹", "Best Ask/Sell Price"],
  //"underlyingValue",
];

const upDownRGList = [
  "changeinOpenInterest",
  "pchangeinOpenInterest",
  "change",
  "pChange",
  "bidprice",
  "askPrice",
];
export const isInUpDownList = (p: string) => upDownRGList.indexOf(p) > -1;

export interface OptionChainData {
  optionChain: {
    records: { expiryDates: any[]; data: any[]; strikePrices: any[] };
    filtered: { data: any[] };
  };
}

export const defaultData: WebResponse = {
  json: {
    records: {
      expiryDates: [],
      data: [],
      strikePrices: [],
      underlyingValue: 0,
    },
    filtered: { data: [] },
  },
} as WebResponse;

export const nextThursday = () => {
  let day = moment();
  let index = 1;
  while (day.format("dddd") !== "Thursday" && index < 8) {
    day = moment().add(index++, "days");
  }
  return day.format("DD-MMM-YYYY");
};
