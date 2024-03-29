import BaseComponent from "../../components/base/component";
import React from "react";

class TSPlayGround extends BaseComponent<any, any> {
  componentDidMount = async () => {
    window.document.body.classList.remove("noscroll");
  };
  render() {
    return (
      <iframe
        title={"Typescript play"}
        src="https://www.typescriptlang.org/play"
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
        frameBorder={0}
        onLoad={(e) => {}}
      ></iframe>
    );
  }
}

export default TSPlayGround;
