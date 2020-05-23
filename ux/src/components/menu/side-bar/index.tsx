import React from "react";
import { Link } from "react-router-dom";
import { getPlugins } from "../../../app";
import { DefaultButton, Stack, IStackTokens } from "office-ui-fabric-react";
import { AssessmentGroupIcon } from "@fluentui/react-icons";
//import { push } from "connected-react-router";

const plugins = getPlugins();

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 1 };

export const ApplicationNavSideMenu: React.FunctionComponent<IButtonExampleProps> = (
  props
) => {
  const { disabled, checked } = props;

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        bottom: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
      }}
    >
      <Stack tokens={stackTokens} horizontal>
        {plugins
          .filter((plugin) => plugin.name !== "dashboard")
          .map((plugin) => (
            <Link key={plugin.name} to={plugin.route.path}>
              <DefaultButton
                disabled={disabled}
                checked={checked}
                styles={{
                  root: {
                    paddingLeft: 10,
                    textAlign: "left",
                    boxSizing: "border-box",
                    width: 150,
                    border: 0,
                    fontSize: 10,
                    borderRadius: 0,
                  },
                }}
                onRenderIcon={() =>
                  plugin.icon || (
                    <AssessmentGroupIcon
                      style={{ width: 16, height: 16, marginRight: 6 }}
                    ></AssessmentGroupIcon>
                  )
                }
              >
                {plugin.name.toUpperCase()}
              </DefaultButton>
            </Link>
          ))}
      </Stack>
    </div>
  );
};
