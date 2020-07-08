import React from "react";
import { Link } from "react-router-dom";
import { getPlugins } from "../../../app";
import { DefaultButton } from "office-ui-fabric-react";
import { AssessmentGroupIcon } from "@fluentui/react-icons";
//import { push } from "connected-react-router";

const plugins = getPlugins();

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

// Example formatting
//const stackTokens: IStackTokens = { childrenGap: 3 };

export class ApplicationNavMenu extends React.Component<any, any> {
  instanceMenu: HTMLDivElement | null;
  prevY: number;
  constructor(props: {}) {
    super(props);
    this.instanceMenu = null;

    this.prevY = 0;
    window.onmousemove = (e: MouseEvent) => {
      const toBottom = e.clientY > this.prevY;
      const inMargin = e.clientY > window.screen.availWidth - 50;
      if (toBottom && inMargin) {
        this.toggleMenu(true);
      }
      this.prevY = e.pageY;
    };
  }
  toggleMenu = (show: boolean) => {
    this.instanceMenu &&
      (this.instanceMenu.style.display = show ? "block" : "none");
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
          width: "100vw",
        }}
      >
        {plugins
          .filter((plugin) => plugin.name !== "dashboard" && plugin.route)
          .map((plugin) => (
            <Link key={plugin.name} to={plugin.route?.path as string}>
              <DefaultButton
                disabled={disabled}
                checked={checked}
                styles={{
                  root: {
                    textAlign: "left",
                    boxSizing: "border-box",
                    maxWidth: 150,
                    border: 0,
                    fontSize: 10,
                    borderRadius: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
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
              >
                {plugin.name.toUpperCase()}
              </DefaultButton>
            </Link>
          ))}
      </div>
    );
  }
}
