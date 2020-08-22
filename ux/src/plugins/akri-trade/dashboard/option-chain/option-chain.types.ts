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
