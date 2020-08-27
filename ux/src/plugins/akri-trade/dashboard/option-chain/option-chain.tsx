import React, { ChangeEvent, useEffect, useState } from "react";
import { defaultData, nextThursday } from "./option-chain.types";

import { DashboardComponentProps } from "../../akri-trade.types";
import MarketQuote from "../../mock/master-quote";
import { NSEOptionRow } from "./option-row";
import { OptionTableHeader } from "./option-chian-table-header";
import { debounce } from "lodash";
import {
  getOptionChain,
} from "../../akri-trade.actions";
import { urls } from "../../trade-url";

const optionChainSymbols = ["NIFTY", "NIFTYIT", "BANKNIFTY", "NIFTYMID50"];

export const NSEOptionChain = ({
  input = { [urls.optionChain.title]: defaultData },
}: DashboardComponentProps) => {
  const {
    records: {
      expiryDates = [],
      data = [],
      strikePrices = [],
      underlyingValue,
    } = defaultData.json.records,
    // filtered: { data: filterdData = [] },
  } = (input[urls.optionChain.title] ?? defaultData)?.json || defaultData.json;

  const [expiry, setExpiry] = useState(expiryDates[0] || nextThursday());
  const [selectedOptionChain, setSelectedOptionChain] = useState(
    optionChainSymbols[0]
  );
  const [strikePrice, setStrikePrice] = useState(Number(underlyingValue));
  const [indexRange, setIndexRange] = useState(
    Number(window.localStorage.getItem("indexRange")) || 600
  );

  useEffect(() => {
    import("./option-chain.styles.css");
  });

  if (!expiry && expiryDates.length) {
    setExpiry(expiryDates[0]);
  }
  if (!strikePrice && Number(underlyingValue)) {
    setStrikePrice(Number(underlyingValue));
  }

  const onSelectSymbol = (e: ChangeEvent<HTMLSelectElement>) => {
    const symbol = e.target.value;
    console.log("Option chain change", symbol);
    setSelectedOptionChain(symbol);
    getOptionChain({ symbol });
  };
  const setStrikePriceRange = debounce((strikePrice: string) => {
    console.log("Strike range onchange", strikePrice);
    setIndexRange(Number(strikePrice));
    window.localStorage.setItem("indexRange", strikePrice);
  }, 800);

  const filteredData = data.filter((r: any) => {
    const selectedStrikePrice = Number(strikePrice);
    const recordStrikePrice = Number(r.strikePrice);
    const high = selectedStrikePrice + indexRange;
    const low = selectedStrikePrice - indexRange;
    if (r.expiryDate !== expiry) return false;
    return high >= recordStrikePrice && low <= recordStrikePrice;
  });

  requestAnimationFrame(() => {
    window.localStorage.setItem("OI_FILTERED", JSON.stringify(filteredData));
  });

  return (
    <div className={"option-chain"}>
      <div>
        <select
          name=""
          id="equity_optionchain_select"
          onChange={onSelectSymbol}
          defaultValue={selectedOptionChain}
        >
          {optionChainSymbols.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        OR
        <select
          id="select_symbol"
          onChange={onSelectSymbol}
          defaultValue={selectedOptionChain}
        >
          {MarketQuote.json.map((quote) => (
            <option key={quote} value={quote}>
              {quote}
            </option>
          ))}
        </select>
        <select
          id="expirySelect"
          onChange={(e) => {
            console.log("Expiry onchange", e.target.value);
            setExpiry(e.target.value);
          }}
          defaultValue={expiry}
        >
          {expiryDates.map((e: string) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
        OR
        <select
          id="strikeSelect"
          defaultValue={strikePrice - (strikePrice % 100)}
          onChange={(e) => {
            const strikePrice = Number(e.target.value);
            console.log("Strike onchange", strikePrice);
            setStrikePrice(strikePrice);
          }}
        >
          {strikePrices.map((s: string) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          type="text"
          id="strikeRange"
          onChange={(e) => {
            const strikePrice = e.target.value;
            setStrikePriceRange(strikePrice);
          }}
          defaultValue={indexRange}
        ></input>
      </div>
      <div className="option-table">
        <table>
          {OptionTableHeader}
          <tbody>
            {filteredData.map((r: any) => {
              const { CE, PE } = r;
              const level = underlyingValue > r.strikePrice ? "up" : "down";
              let index = 0;
              const getIndex = () => index++;
              return (
                <tr
                  className="option-row"
                  data-level={level}
                  data-col={getIndex()}
                >
                  <th
                    className="expiry"
                    data-col={getIndex()}
                    title={r.expiryDate}
                  >
                    {r.expiryDate.split("-").slice(0, 2).join("")}
                  </th>
                  <th data-col={getIndex()}>G</th>
                  <NSEOptionRow
                    option={CE}
                    type={"call"}
                    level={level}
                    getIndex={getIndex}
                  ></NSEOptionRow>
                  <td className={"strike"} data-col={getIndex()}>
                    {r.strikePrice}
                  </td>
                  <NSEOptionRow
                    option={PE}
                    type={"put"}
                    level={level}
                    getIndex={getIndex}
                  ></NSEOptionRow>
                  <th data-col={getIndex()}>G</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
