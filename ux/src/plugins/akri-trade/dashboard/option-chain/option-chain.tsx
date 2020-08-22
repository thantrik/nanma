import { OptionChainProps, defaultData } from "./option-chain.types";
import React, { useEffect, useState } from "react";

import MarketQuote from "../../mock/master-quote";
import { NSEOptionRow } from "./option-row";
import { OptionTableHeader } from "./option-chian-table-header";

export const NSEOptionChain = ({ input = defaultData }: OptionChainProps) => {
  const {
    records: {
      expiryDates = [],
      data = [],
      strikePrices = [],
      underlyingValue,
    },
    // filtered: { data: filterdData = [] },
  } = input.json;

  const [expiry, setExpiry] = useState(expiryDates[0]);

  useEffect(() => {
    import("./option-chain.styles.css");
  });
  if (!expiry && expiryDates.length) {
    setExpiry(expiryDates[0]);
  }

  return (
    <div className={"option-chain"}>
      <div>
        <select name="" id="equity_optionchain_select">
          <option value="NIFTY" selected={true}>
            NIFTY
          </option>
          <option value="NIFTYIT">NIFTYIT</option>
          <option value="BANKNIFTY">BANKNIFTY</option>
        </select>
        OR
        <select id="select_symbol">
          {MarketQuote.json.map((quote) => (
            <option value={quote}>{quote}</option>
          ))}
        </select>
        <select
          id="expirySelect"
          onChange={(e) => {
            console.log("Expiry onchange", e.target.value);
            setExpiry(e.target.value);
          }}
        >
          {expiryDates.map((e: string) => (
            <option value={e}>{e}</option>
          ))}
        </select>
        OR
        <select id="strikeSelect">
          {strikePrices.map((s: string) => (
            <option value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="option-table">
        <table>
          {OptionTableHeader}
          <tbody>
            {data
              .filter((r: any) => {
                return r.expiryDate === expiry;
              })
              .map((r: any) => {
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
