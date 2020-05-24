import React from "react";
import { FontIcon } from "office-ui-fabric-react/lib/Icon";
import { mergeStyles, registerIcons } from "office-ui-fabric-react/lib/Styling";

const icon = (
  <FontIcon
    iconName="word"
    className={mergeStyles({
      width: 16,
      height: 16,
      marginRight: 6,
    })}
  />
);

export default icon;
