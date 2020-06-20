import React from "react";
import "./symbols.style.css";

type RangeStruct = { from: number; to: number };
type Ranges = Array<RangeStruct | Array<number>>;
type SymbolsCategory = {
  name: string;
  ranges: Ranges;
};

const unicodeGroups: SymbolsCategory[] = [
  {
    name: "Arrows",
    ranges: [
      { from: 0x2190, to: 0x2199 },
      { from: 0x0219a, to: 0x21af },
      { from: 0x021b0, to: 0x21b3 },
      { from: 0x021b4, to: 0x21bb },
      { from: 0x021bc, to: 0x21c3 },
      { from: 0x021c4, to: 0x21cc },
      { from: 0x021cd, to: 0x21d9 },
      { from: 0x021da, to: 0x21e5 },
      { from: 0x021e6, to: 0x21f3 },
      { from: 0x021f4, to: 0x21ff },
      { from: 0x27f0, to: 0x27ff },
      { from: 0x2900, to: 0x297f },
      { from: 0x2b00, to: 0x2bff },
      { from: 0x1f800, to: 0x1f8ff },
    ],
  },
  {
    name: "Mathematical Operators",
    ranges: [
      { from: 0x2200, to: 0x22ff },
      { from: 0x27c0, to: 0x27ef },
      { from: 0x2980, to: 0x29ff }, //Maths -B
      { from: 0x2a00, to: 0x2aff },
      { from: 0x1f780, to: 0x1f7ff },
    ],
  },
  {
    name: "Miscellaneous Technical",
    ranges: [{ from: 0x2300, to: 0x23ff }],
  },
  {
    name: "Optical Character Recognition",
    ranges: [{ from: 0x2440, to: 0x244a }],
  },
  {
    name: "Enclosed Alphanumerics",
    ranges: [
      { from: 0x2460, to: 0x24ff },
      { from: 0x1f100, to: 0x1f1ff },
    ],
  },
  {
    name: "Box Drawing",
    ranges: [{ from: 0x2500, to: 0x257f }],
  },
  {
    name: "Block Elements",
    ranges: [{ from: 0x2580, to: 0x259f }],
  },
  {
    name: "Geometric Shapes",
    ranges: [{ from: 0x25a0, to: 0x25ff }],
  },
  {
    name: "Miscellaneous Symbols",
    ranges: [{ from: 0x2600, to: 0x26ff }],
  },
  {
    name: "Dingbats",
    ranges: [
      { from: 0x2700, to: 0x27bf },
      { from: 0x1f650, to: 0x1f67f },
    ],
  },
  {
    name: "Glagolitic",
    ranges: [{ from: 0x2c00, to: 0x2c5f }],
  },

  {
    name: "Latin Extended-C",
    ranges: [{ from: 0x2c60, to: 0x2c7f }],
  },

  {
    name: "Tifinagh",
    ranges: [{ from: 0x2d30, to: 0x2d7f }],
  },

  {
    name: "Supplemental Punctuation",
    ranges: [
      { from: 0x2e00, to: 0x2e7f },
      { from: 0x3000, to: 0x303f },
    ],
  },

  {
    name: "Ideographic Description Characters",
    ranges: [{ from: 0x2ff0, to: 0x2fff }],
  },
  {
    name: " Yijing Hexagram Symbols",
    ranges: [{ from: 0x4dc0, to: 0x4dff }],
  },
  {
    name: "Latin Extended-D",
    ranges: [{ from: 0xa720, to: 0xa7ff }],
  },
  {
    name: "Symbols and Pictographs",
    ranges: [
      { from: 0x1f300, to: 0x1f5ff },
      { from: 0x1f900, to: 0x1f9ff },
      { from: 0x1fa70, to: 0x1faff },
    ],
  },
  {
    name: "Emoji symbols",
    ranges: [{ from: 0x1f600, to: 0x1f64f }],
  },
  {
    name: "Transport and Map Symbols",
    ranges: [{ from: 0x1f680, to: 0x1f6ff }],
  },
  {
    name: "Alchemical Symbols",
    ranges: [{ from: 0x1f700, to: 0x1f77f }],
  },
  {
    name: "Playing Cards",
    ranges: [{ from: 0x1f0a0, to: 0x1f0ff }],
  },
];

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
              code.appendChild(document.createTextNode(String.fromCharCode(i)));
              this.panel.appendChild(code);
            }
          } else
            for (let i = range.from; i <= range.to; i++) {
              const code = document.createElement("span");
              code.appendChild(document.createTextNode(String.fromCharCode(i)));
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
