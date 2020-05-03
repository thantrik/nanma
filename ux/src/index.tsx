import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import JSONEditorApp from "./JSONEditorApp";

const initializeJSONView = () =>
  ReactDOM.render(
    <React.StrictMode>
      <JSONEditorApp />
    </React.StrictMode>,
    window.document.body
  );

const { location } = window;
//@ts-ignore
window.jsonView = initializeJSONView;
if (
  location.href.indexOf("chrome-extension://") !== -1 &&
  window.history.length === 1
)
  initializeJSONView();
