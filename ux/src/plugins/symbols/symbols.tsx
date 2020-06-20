import React from "react";
import "./symbols.style.css";
import { unicodeGroups } from "./symbols.data";
class SymbolsViewer extends React.Component<any, any> {
  panel: HTMLDivElement | null = null;
  componentDidMount() {
    window.document.body.classList.remove("no-scroll");
    if (this.panel) {
      for (const group of unicodeGroups) {
        const h: HTMLHeadingElement = document.createElement("h3");
        h.appendChild(document.createTextNode(group.name));
        this.panel.appendChild(h);
        for (const range of group.ranges)
          if (Array.isArray(range)) {
            for (let i of range) {
              const code = document.createElement("span");
              code.onclick = () => document.execCommand("copy");
              code.innerHTML = `&#${i};`;
              this.panel.appendChild(code);
            }
          } else
            for (let i = range.from; i <= range.to; i++) {
              const code = document.createElement("span");
              code.onclick = () => document.execCommand("copy");
              code.innerHTML = `&#${i};`;
              this.panel.appendChild(code);
            }
      }
    }
  }
  render() {
    return (
      <div className={"unicode-panel"} ref={(ele) => (this.panel = ele)}></div>
    );
  }
}

export default SymbolsViewer;
