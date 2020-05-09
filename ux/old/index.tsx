import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import JSONEditorApp from "./JSONEditorApp";
import CodeView from "./CodeView";
import ToggleMenu from "./menu/toggle/ToggleMenu";
import UrlProcessor from "./UrlProcessor/UrlProcessor";
import RichTextEditor from "./components/editor/RichTextEditor";

const initializeView = (data?: string, type?: string) => {
  ReactDOM.render(
    <React.Fragment>
      <ToggleMenu></ToggleMenu>
      <RichTextEditor></RichTextEditor>
      <UrlProcessor></UrlProcessor>
      {/* {type && type === "json" ? (
        <JSONEditorApp />
      ) : (
        <CodeView language={type} data={data} />
      )} */}
    </React.Fragment>,
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

initializeView("{}", "json");
