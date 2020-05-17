import { context, AppContext, store } from "../../app";
import { push } from "connected-react-router";
import config from "./code.config";
import { setCodeView } from "./code.actions";

declare global {
  interface Window {
    ___DATA: any;
  }
}

const location = window.location;

const codeView = (language: string, data: string) => {
  context.setDOMOwner(config);
  window.___DATA = data;
  setCodeView({
    data: data,
    language: language || "typescript",
  });
};

const hook = (context: AppContext) => {
  if (document?.doctype?.name === "html") return;
  const data = String(document.body.innerText).trim();
  if (!data) {
    return;
  }
  if (/\.(js|mjs|jsx)$/.test(location.href)) {
    return codeView("javascript", data);
  }
  if (/\.(ts|tsx|c|cpp|cs)$/.test(location.href)) {
    return codeView("typescript", data);
  }
  if (/\.(css)$/.test(location.href)) {
    return codeView("css", data);
  }
  if (/\.(text|txt|log)$/.test(location.href)) {
    return codeView("text", data);
  }
  if (/\.md$/i.test(location.href)) {
    return codeView("markdown", data);
  }
};

export default hook;
