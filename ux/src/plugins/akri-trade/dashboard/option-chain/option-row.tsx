import React from "react";
import { optionPropsMap } from "./option-chain.types";

export interface NSEOption {
  strikePrice: number;
  expiryDate: string;
  underlying: string;
  identifier: string;
  openInterest: number;
  changeinOpenInterest: number;
  pchangeinOpenInterest: number;
  totalTradedVolume: number;
  impliedVolatility: number;
  lastPrice: number;
  change: number;
  pChange: number;
  totalBuyQuantity: number;
  totalSellQuantity: number;
  bidQty: number;
  bidprice: number;
  askQty: number;
  askPrice: number;
  underlyingValue: number;
}

type NSEOptionType = "call" | "put";

export interface NSEOptionRowProps {
  option: NSEOption;
  type: NSEOptionType;
  level: string;
  getIndex: () => number;
}

const callProps = optionPropsMap.map((p) => p[0]);
const putProps = callProps.reverse();

const toggleHover = (className: string, add: boolean = true) => (
  e: MouseEvent
) => {
  const ele: HTMLTableCellElement = e.target as HTMLTableCellElement;
  const col = ele.getAttribute("data-col");
  const selector = `.option-table table tbody tr.option-row td[data-col="${col}"]`;
  const elms = document.querySelectorAll(selector);
  elms?.forEach((r) =>
    add ? r.classList.add(className) : r.classList.remove(className)
  );
};

export const NSEOptionRow = (props: NSEOptionRowProps) => {
  const { type, option = {}, level, getIndex } = props;
  //   const {
  //     strikePrice,
  //     expiryDate,
  //     underlying,
  //     identifier,
  //     openInterest,
  //     changeinOpenInterest,
  //     pchangeinOpenInterest,
  //     totalTradedVolume,
  //     impliedVolatility,
  //     lastPrice,
  //     change,
  //     pChange,
  //     totalBuyQuantity,
  //     totalSellQuantity,
  //     bidQty,
  //     bidprice,
  //     askQty,
  //     askPrice,
  //     underlyingValue,
  //   } = option;
  return (
    <>
      {(type === "call" ? callProps : putProps).map((p: string) => {
        const val: string = ((option as any)[p] as string) ?? "-";
        const nVal = Number(val);

        return (
          <td
            className={type}
            data-level={level}
            data-col={getIndex()}
            onMouseEnter={toggleHover("hover") as any}
            onMouseLeave={toggleHover("hover", false) as any}
            style={!isNaN(nVal) && nVal < 0 ? { color: "red" } : {}}
          >
            {!isNaN(nVal)
              ? isFloat(nVal)
                ? nVal.toFixed(1)
                : nVal !== 0
                ? nVal
                : ""
              : val}
          </td>
        );
      })}
    </>
  );
};

const isFloat = (n: number) => n % 1 !== 0;
