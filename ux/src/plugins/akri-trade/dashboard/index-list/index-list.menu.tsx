import { FontIcon } from "@fluentui/react";
import React from "react";

export const IndexListMenu = ({ active = false }: { active: boolean }) => (
  <div className={`menu-item ${active ? "active" : ""}`} title="Index - list">
    <FontIcon iconName="Home" />
  </div>
);
