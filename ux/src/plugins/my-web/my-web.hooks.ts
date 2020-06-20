import { AppContext, setDOMOwner } from "../../app";
import { setMyWebView } from "./my-web.actions";
import config from "./my-web.config";
import {
  MyWebSnippetsModal,
  IMyWebSnippetsModal,
} from "./components/form/modal";

const myWebView = (data: string, parse = false) => {
  setDOMOwner(config, () => {
    setMyWebView({ data });
  });
};

const injectCSS = (css: string[]) => {
  const styleEl = document.createElement("style");
  styleEl.setAttribute("name", config.name);
  document.head.appendChild(styleEl);
  if (styleEl) {
    //const styleSheet = styleEl.sheet;
    const rules = css.map((rule) => document.createTextNode(rule));
    for (const rule of rules) {
      styleEl.appendChild(rule);
    }
  }
};

const injectJS = (scripts: string[]) => {
  const scriptEl = document.createElement("script");
  scriptEl.setAttribute("name", config.name);
  const inlineScripts = scripts.map((script) =>
    document.createTextNode(`${script};`)
  );
  for (const script of inlineScripts) {
    scriptEl.appendChild(script);
  }
  document.head.appendChild(scriptEl);
};

const handleSnippets = (snippets: MyWebSnippetsModal[]) => {
  if (snippets && snippets.length) {
    snippets.forEach((snippet: IMyWebSnippetsModal) => {
      snippet.test = new RegExp(snippet.test);
      if (snippet.test.test(window.location.href)) {
        try {
          injectCSS(snippet.css);
        } catch (e) {
          console.log("injectCSS", e);
        }
        try {
          injectJS(snippet.script);
        } catch (e) {
          console.log("injectJS", e);
        }
      }
    });
  }
  // check all domains match
  // if (/\.(myWeb)$/i.test(window.location.href)) {
  //   myWebView(window.location.href);
  // }
};

const hook = async (context: AppContext) => {
  if (context.isExtension || context.isLocalHost) return;
  chrome.runtime.sendMessage(
    {
      name: config.name,
      method: "getAllSnippets",
    },
    function (response) {
      console.log("MyWeb Snippets: ", response);
      handleSnippets(response);
    }
  );
};

export default hook;
