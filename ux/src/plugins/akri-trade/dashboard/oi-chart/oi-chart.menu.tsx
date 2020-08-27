import { FontIcon } from "@fluentui/react";
import React from "react";

export const OiChartMenu = ({ active = false }: { active: boolean }) => (
  <div
    className={`menu-item ${active ? "active" : ""}`}
    title="Open interest - option chain"
  >
    <FontIcon iconName="StackedLineChart" />
  </div>
);
