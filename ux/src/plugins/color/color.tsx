import {
  BlockPicker,
  ChromePicker,
  CirclePicker,
  CompactPicker,
  GithubPicker,
  MaterialPicker,
  PhotoshopPicker,
  SketchPicker,
  SliderPicker,
  SwatchesPicker,
  TwitterPicker,
} from "react-color";

import BaseComponent from "../../components/base/component";
import React from "react";

const Panel = (props: any) => <div style={{}}>{props.children}</div>;

export default class ColorView extends BaseComponent {
  state = {
    background: document.body.style.backgroundColor,
  };

  handleChange = (color: any) => {
    this.setState({ background: color.hex }, () => {
      window.document.body.style.backgroundColor = this.state.background;
    });
  };

  render() {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <Panel>
            <PhotoshopPicker
              color={this.state.background}
              onChange={this.handleChange}
            />
          </Panel>
          <Panel>
            <SketchPicker
              disableAlpha={false}
              color={this.state.background}
              onChange={this.handleChange}
            />
          </Panel>
          <Panel>
            <ChromePicker
              color={this.state.background}
              onChange={this.handleChange}
            />
          </Panel>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Panel>
              <GithubPicker
                color={this.state.background}
                onChange={this.handleChange}
              />
            </Panel>
            <Panel>
              <BlockPicker
                color={this.state.background}
                onChange={this.handleChange}
              />
            </Panel>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Panel>
              <SwatchesPicker
                color={this.state.background}
                onChange={this.handleChange}
              />
            </Panel>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Panel>
              <CompactPicker
                color={this.state.background}
                onChange={this.handleChange}
              />
            </Panel>
            <Panel>
              <MaterialPicker
                color={this.state.background}
                onChange={this.handleChange}
              />
            </Panel>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Panel>
              <TwitterPicker
                color={this.state.background}
                onChange={this.handleChange}
              />
            </Panel>
            <Panel>
              <CirclePicker
                color={this.state.background}
                onChange={this.handleChange}
              />
            </Panel>
          </div>
        </div>

        <div style={{ padding: 10, marginBottom: 30 }}>
          <SliderPicker
            color={this.state.background}
            onChange={this.handleChange}
          />
        </div>
      </>
    );
  }
}
