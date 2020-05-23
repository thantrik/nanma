import React from "react";
import MarkdownIt from "markdown-it";

// import "./md-viewer.style.css";
import "@primer/css/dist/base.css";
import "@primer/css/dist/core.css";
import "@primer/css/dist/support.css";
import "@primer/css/dist/markdown.css";

const config = {
  html: false, // Enable HTML tags in source
  xhtmlOut: false, // Use '/' to close single tags (<br />).
  // This is only for full CommonMark compatibility.
  breaks: true, // Convert '\n' in paragraphs into <br>
  // langPrefix: "language-", // CSS language prefix for fenced blocks. Can be
  // useful for external highlighters.
  linkify: false, // Autoconvert URL-like text to links

  // Enable some language-neutral replacement + quotes beautification
  typographer: true,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  // quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externally.
  // If result starts with <pre... internal wrapper is skipped.
  // highlight: hljs,
};

class MarkDownEditorApp extends React.Component<any, any> {
  private processor: MarkdownIt;
  private editor: HTMLDivElement | null;
  private viewer: HTMLElement | null;
  constructor(props: any) {
    super(props);
    this.state = {
      content: "",
      config,
    };
    this.viewer = null;
    this.editor = null;
    this.processor = MarkdownIt(config)
      .use(require("markdown-it-sub"))
      .use(require("markdown-it-sup"))
      .use(require("markdown-it-footnote"))
      .use(require("markdown-it-emoji"))
      .use(require("markdown-it-container"))
      .use(require("markdown-it-abbr"))
      .use(require("markdown-it-deflist"))
      .use(require("markdown-it-ins"))
      .use(require("markdown-it-mark"));
  }

  componentDidMount() {
    //const self = this;
    const { data } = this.props;
    if (this.viewer) {
      this.viewer.innerHTML = this.processor.render(
        //@ts-ignore
        window.__DATA || data || ""
      );
    }
  }
  updateContent = () => {
    const content = this.editor?.innerText;
    const { readOnly, data } = this.props;
    this.viewer &&
      //@ts-ignore
      (this.viewer.innerHTML = this.processor.render(
        //@ts-ignore
        window.__DATA || (readOnly ? data : content) || ""
      ));
  };
  render() {
    const { readOnly = false } = this.props;
    const article = (
      <article
        className="markdown-body"
        ref={(ele) => (this.viewer = ele)}
        style={
          !readOnly
            ? {
                width: "60vw",
                minHeight: "100vw",
                border: "solid 1px #CDCDCD",
                borderRight: "none",
                padding: 10,
              }
            : {}
        }
      ></article>
    );
    if (readOnly) return article;
    return (
      <div
        ref={(ele) => {
          window.document.body.style.backgroundColor = "white";
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "space-around",
          justifyContent: "space-around",
          overflowX: "hidden",
        }}
      >
        <h3 style={{ width: "100vw", color: "#ABABAB", paddingLeft: 10 }}>
          MARKDOWN EDITOR
        </h3>
        <div
          className="App"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "space-around",
            justifyContent: "space-around",
          }}
        >
          <div
            onKeyUp={this.updateContent}
            ref={(ele) => (this.editor = ele)}
            style={{
              width: "39vw",
              minHeight: "100vh",
              border: "solid 1px #CDCDCD",
              borderRight: "none",
              borderLeft: "none",
              padding: 5,
            }}
            contentEditable={true}
          ></div>
          {article}
        </div>
      </div>
    );
  }
}

export default MarkDownEditorApp;
