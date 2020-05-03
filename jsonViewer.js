const data = String(document.body.innerText).trim();
let jsonParse = false;
try {
  window.___JSON = JSON.parse(data);
  window.jsonView && jsonView();
  jsonParse = true;
} catch (e) {}

if (!jsonParse && data) {
  try {
    const pos = data.indexOf("\n");
    if (pos !== -1) {
      const firstLine = data.substr(0, pos) || "";
      if (
        firstLine &&
        (firstLine.trim().indexOf("{") !== -1 ||
          firstLine.trim().indexOf("[") !== -1)
      ) {
        window.___JSON = data;
        window.jsonView && jsonView();
      }
    }
  } catch (e) {}
}
