import { context, AppContext } from "../../app";
import config from "./md-editor.config";
import { setMdView } from "./md-editor.actions";

declare global {
  interface Window {
    ___DATA: any;
  }
}

const location = window.location;

const mdView = (data: string) => {
  context.setDOMOwner(config);
  window.___DATA = data;
  setMdView(data);
};

const hook = (context: AppContext) => {
  if (document?.doctype?.name === "html") return;
  const data = String(document.body.innerText).trim();

  if (!data) {
    return;
  }

  if (/\.md$/i.test(location.href)) {
    return mdView(data);
  }
};

export default hook;
