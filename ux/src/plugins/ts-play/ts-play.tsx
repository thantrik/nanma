import React from "react";

class TSPlayGround extends React.Component<any, any> {
  render() {
    return (
      <iframe
        title={"Typescript play"}
        src="https://www.typescriptlang.org/play"
        style={{
          width: "100vw",
          height: "100vh",
        }}
        frameBorder={0}
      ></iframe>
    );
  }
}

export default TSPlayGround;
