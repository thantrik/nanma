import { FontIcon } from "@fluentui/react";
import React from "react";

export const OptionChainMenu = ({ active = false }: { active: boolean }) => (
  <div className={`menu-item ${active ? "active" : ""}`} title="option chain">
    <FontIcon iconName="Table" />
  </div>
);
