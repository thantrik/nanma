import { context, AppContext } from "../../app";
import { setMyWebView } from "./my-web.actions";
import config from "./my-web.config";
import {
  MyWebSnippetsModal,
  IMyWebSnippetsModal,
} from "./components/form/modal";

const myWebView = (data: string, parse = false) => {
  context.setDOMOwner(config);
  setMyWebView({ data });
};

const injectCSS = (css: string[]) => {
  const styleEl = document.createElement("style");
  document.head.appendChild(styleEl);
  if (styleEl.sheet) {
    const styleSheet = styleEl.sheet;

    for (const rule of css) {
      // @ts-ignore
      styleSheet.insertRule(rule);
    }
  }
};

const injectJS = (scripts: string[]) => {
  const scriptEl = document.createElement("script");
  scriptEl.innerHTML = scripts.join(" ");
  document.head.appendChild(scriptEl);
};

const hook = async (context: AppContext) => {
  const snippets: MyWebSnippetsModal[] = await MyWebSnippetsModal.getAll();

  if (snippets && snippets.length) {
    snippets.forEach((snippet: IMyWebSnippetsModal) => {
      if (snippet.test.test(window.location.href)) {
        injectCSS(snippet.css);
        injectJS(snippet.script);
      }
    });
  }
  // check all domains match
  if (/\.(myWeb)$/i.test(window.location.href)) {
    myWebView(window.location.href);
  }
};

export default hook;
