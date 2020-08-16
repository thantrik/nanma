enum DataType {
  json = "json",
  html = "html",
  text = "text",
  binary = "binary",
  csv = "csv",
}

// const get_quote_url =
//   "https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/GetQuote.jsp?";
const allIndices = "https://www.nseindia.com/api/allIndices";
const stocks_csv_url = "http://www1.nseindia.com/content/equities/EQUITY_L.csv";
const top_gainer_url =
  "http://www1.nseindia.com/live_market/dynaContent/live_analysis/gainers/niftyGainers1.json";
const top_loser_url =
  "http://www1.nseindia.com/live_market/dynaContent/live_analysis/losers/niftyLosers1.json";
const top_fno_gainer_url =
  "https://www1.nseindia.com/live_market/dynaContent/live_analysis/gainers/fnoGainers1.json";
const top_fno_loser_url =
  "https://www1.nseindia.com/live_market/dynaContent/live_analysis/losers/fnoLosers1.json";
const advances_declines_url =
  "http://www1.nseindia.com/common/json/indicesAdvanceDeclines.json";
const index_url = "http://www1.nseindia.com/homepage/Indices1.json";
// const bhavcopy_base_url =
//   "https://www1.nseindia.com/content/historical/EQUITIES/%s/%s/cm%s%s%sbhav.csv.zip";
// const bhavcopy_base_filename = "cm%s%s%sbhav.csv";
const active_equity_monthly_url =
  "https://www1.nseindia.com/products/dynaContent/equities/equities/json/mostActiveMonthly.json";
const year_high_url =
  "https://www1.nseindia.com/products/dynaContent/equities/equities/json/online52NewHigh.json";
const year_low_url =
  "https://www1.nseindia.com/products/dynaContent/equities/equities/json/online52NewLow.json";
const preopen_nifty_url =
  "https://www1.nseindia.com/live_market/dynaContent/live_analysis/pre_open/nifty.json";
const preopen_fno_url =
  "https://www1.nseindia.com/live_market/dynaContent/live_analysis/pre_open/fo.json";
const preopen_niftybank_url =
  "https://www1.nseindia.com/live_market/dynaContent/live_analysis/pre_open/niftybank.json";
const fno_lot_size_url = "https://www1.nseindia.com/content/fo/fo_mktlots.csv";

export interface DataUrl {
  title: string;
  url: string;
  type: DataType;
}
const createUrl = (title: string, url: string, type: DataType): DataUrl => ({
  title,
  url,
  type,
});

const urls = {
  // createUrl("QUOTES", get_quote_url, DataType.json),
  allIndices: createUrl("ALL INDICES", allIndices, DataType.json),
  topGainers: createUrl("TOP GAINERS", top_gainer_url, DataType.json),
  topLosers: createUrl("TOP LOSERS", top_loser_url, DataType.json),
  topFnoGainers: createUrl(
    "TOP FNO GAINERS",
    top_fno_gainer_url,
    DataType.json
  ),
  topFnoLosers: createUrl("TOP FNO LOSERS", top_fno_loser_url, DataType.json),
  advancesDeclines: createUrl(
    "ADVANCES DECLINES",
    advances_declines_url,
    DataType.json
  ),
  indices: createUrl("INDICES", index_url, DataType.json),
  activeEQ: createUrl("ACTIVE EQ", active_equity_monthly_url, DataType.json),
  yearHigh: createUrl("YEAR HIGH", year_high_url, DataType.json),
  yearLow: createUrl("YEAR LOW", year_low_url, DataType.json),
  preOpenNifty: createUrl("PRE OPEN NIFTY", preopen_nifty_url, DataType.json),
  preOpenFno: createUrl("PRE OPEN FNO", preopen_fno_url, DataType.json),
  preOpenNiftyBank: createUrl(
    "PRE OPEN NIFTY BANK",
    preopen_niftybank_url,
    DataType.json
  ),
  fnoLotSize: createUrl("FNO LOT SIZE", fno_lot_size_url, DataType.json),
  stocks: createUrl("STOCKS", stocks_csv_url, DataType.csv),
};

export { urls, DataType };
