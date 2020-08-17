import { DefaultButton, IStackTokens, Stack } from "office-ui-fabric-react";

import { AssessmentGroupIcon } from "@fluentui/react-icons";
import { Link } from "react-router-dom";
import React from "react";
import { getPlugins } from "../../../app";

//import { push } from "connected-react-router";

const plugins = getPlugins();

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 3 };

export class ApplicationNavMenu extends React.Component<any, any> {
  instanceMenu: HTMLDivElement | null;
  prevY: number;
  constructor(props: {}) {
    super(props);
    this.instanceMenu = null;

    this.prevY = 0;
    window.onmousemove = (e: MouseEvent) => {
      const yCord = e.clientY;
      // const toBottom = yCord > this.prevY;
      const inMargin = yCord > window.innerHeight - 50;
      console.log(yCord, window.innerHeight, window.innerHeight - 50);
      this.toggleMenu(inMargin);
      this.prevY = yCord;
    };
  }
  toggleMenu = (show: boolean) => {
    this.instanceMenu &&
      (this.instanceMenu.style.display = show ? "flex" : "none");
  };
  render() {
    const { disabled, checked } = this.props;

    return (
      <div
        ref={(ele) => (this.instanceMenu = ele)}
        style={{
          position: "fixed",
          bottom: 0,
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          width: "100vw",
        }}
      >
        <Stack tokens={stackTokens} horizontal>
          {plugins
            .filter((plugin) => plugin.name !== "dashboard" && plugin.route)
            .map((plugin) => (
              <Link key={plugin.name} to={plugin.route?.path as string}>
                <DefaultButton
                  disabled={disabled}
                  checked={checked}
                  width={20}
                  styles={{
                    root: {
                      textAlign: "left",
                      boxSizing: "border-box",
                      border: 0,
                      fontSize: 10,
                      borderRadius: 0,
                      maxWidth: 20,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderTopLeftRadius: 1,
                      borderTopRightRadius: 1,
                      borderBottomLeftRadius: 1,
                      borderBottomRightRadius: 1,
                    },
                    rootHovered: {
                      backgroundColor: "#D5FAFF",
                    },
                    labelHovered: {
                      textDecoration: "none",
                    },
                    iconHovered: {},
                  }}
                  onRenderIcon={() =>
                    plugin.icon || (
                      <AssessmentGroupIcon
                        style={{ width: 16, height: 16 }}
                      ></AssessmentGroupIcon>
                    )
                  }
                  title={plugin.name.toUpperCase()}
                ></DefaultButton>
              </Link>
            ))}
        </Stack>
      </div>
    );
  }
}
