import React from "react";
import { optionPropsMap } from "./option-chain.types";

const optionCallHeader = [
  <th>
    <span>G</span>
  </th>,
  ...optionPropsMap.map((p: any[]) => (
    <th title={p[2] ?? p[0]}>{p[1] ?? p[0]}</th>
  )),
];

const optionPutHeader = [...optionCallHeader].reverse();

export const OptionTableHeader = (
  <thead>
    <tr>
      <th></th>
      <th className="text-center" colSpan={optionCallHeader.length}>
        CALLS
      </th>
      <th></th>
      <th className="text-center" colSpan={optionPutHeader.length}>
        PUTS
      </th>
    </tr>
    <tr>
      <th>
        <span> EXP </span>
      </th>
      {optionCallHeader}
      <th>
        Strike ₹<span> </span>
      </th>
      {optionPutHeader}
    </tr>
  </thead>
);
