import React from "react";
import UrlEncodeDecode from "./UrlEncodeDecode";
import UrlDiff from "./UrlDiff";

export default class UrlProcessor extends React.Component {
  render() {
    return (
      <React.Fragment>
        <UrlEncodeDecode></UrlEncodeDecode>
        <UrlDiff></UrlDiff>
      </React.Fragment>
    );
  }
}
