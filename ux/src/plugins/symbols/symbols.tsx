import BaseComponent from "../../components/base/component";
import React from "react";
import { unicodeGroups } from "./symbols.data";

function copySymbol(this: HTMLSpanElement, ev: MouseEvent) {
  this.focus();
  window.navigator.clipboard.writeText(this.innerText);
  ev.preventDefault();
  ev.stopImmediatePropagation();
}

const addSymbol = (i: number, panel: HTMLDivElement) => {
  const code = document.createElement("span");
  // @ts-ignore
  code.innerHTML = `&#${i};`;
  code.addEventListener("click", copySymbol);
  code.addEventListener("mouseover", copySymbol);
  panel.appendChild(code);
};
class SymbolsViewer extends BaseComponent<any, any> {
  panel: HTMLDivElement | null = null;
  componentDidMount = async () => {
    // @ts-ignore
    import("./symbols.style.css");
    window.document.body.classList.remove("no-scroll");
    if (this.panel) {
      for (const group of unicodeGroups) {
        const h: HTMLHeadingElement = document.createElement("h3");
        h.appendChild(document.createTextNode(group.name));
        this.panel.appendChild(h);
        for (const range of group.ranges)
          if (Array.isArray(range)) {
            for (let i of range) {
              addSymbol(i, this.panel);
            }
          } else
            for (let i = range.from; i <= range.to; i++)
              addSymbol(i, this.panel);
      }
    }
  };
  render() {
    return (
      <>
        <div
          className={"unicode-panel"}
          ref={(ele) => (this.panel = ele)}
        ></div>
      </>
    );
  }
}

export default SymbolsViewer;
