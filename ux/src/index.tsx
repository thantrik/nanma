import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import JSONEditorApp from "./JSONEditorApp";
import CodeView from "./CodeView";

const initializeView = (data?: string, type?: string) => {
  ReactDOM.render(
    type && type === "json" ? (
      <JSONEditorApp />
    ) : (
      <CodeView language={type} data={data} />
    ),
    window.document.body
  );
};

const { location } = window;
//@ts-ignore
window.editorView = initializeView;
if (
  location.href.indexOf("chrome-extension://") !== -1 &&
  window.history.length === 1
)
  initializeView("{}", "json");
