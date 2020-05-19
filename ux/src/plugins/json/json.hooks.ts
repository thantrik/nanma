import { store, context, AppContext } from "../../app";
import { push } from "connected-react-router";
import config from "./json.config";

declare global {
  interface Window {
    ___DATA: any;
  }
}

const jsonView = (data: any, parse = false) => {
  context.setDOMOwner(config);
  if (parse) window.___DATA = JSON.parse(data);
  window.___DATA = data;
  store.dispatch(push("/json"));
};

const hook = (context: AppContext) => {
  if (document?.doctype?.name === "html") return;
  const data = String(document.body.innerText).trim();
  if (!data) {
    return;
  }
  try {
    jsonView(data, true);
    return;
  } catch (e) {}
  try {
    const pos = data.indexOf("\n");
    if (pos !== -1) {
      const firstLine = data.substr(0, pos) || "";
      if (
        firstLine &&
        (firstLine.trim().indexOf("{") !== -1 ||
          firstLine.trim().indexOf("[") !== -1)
      ) {
        jsonView(data, false);
        return;
      }
    }
  } catch (e) {}

  if (/\.(json)$/i.test(window.location.href)) {
    jsonView(data, false);
  }
};

export default hook;
