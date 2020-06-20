import { AppContext, setDOMOwner } from "../../app";
import { setJsonView } from "./json.actions";
import config from "./json.config";

const jsonView = (data: string, parse = false) => {
  setDOMOwner(config, () => setJsonView({ data }));
};

const hook = (context: AppContext) => {
  if (context.isHTML()) return;
  const data = String(document.body.innerText).trim();
  if (!data) {
    return;
  }
  try {
    JSON.parse(data);
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
