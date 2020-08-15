import React from "react";

export default class BaseComponent<
  S = {},
  P = {},
  PP = any
> extends React.Component<P, S, PP> {
  componentDidMount = async () => {
    //@ts-ignore
    await import("../../app/app.styles.css");
  };
}
