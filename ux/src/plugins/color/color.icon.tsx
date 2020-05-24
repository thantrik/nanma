import React from "react";
import StackIndicator from "@fluentui/react-icons/lib/components/StackIndicatorIcon";
import { mergeStyles } from "@fluentui/react";

const icon = (
  <StackIndicator
    className={mergeStyles({
      width: 16,
      height: 16,
      marginRight: 0,
    })}
  />
);

export default icon;
