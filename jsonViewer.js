const editorView = (data, type) =>
  window.editorView && window.editorView(data, type);
const initialize = () => {
  if (document?.doctype?.name === "html") return;
  const data = String(document.body.innerText).trim();
  if (!data) {
    return;
  }
  try {
    window.___JSON = JSON.parse(data);
    editorView(null, "json");
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
        window.___JSON = data;
        editorView(null, "json");
        return;
      }
    }
  } catch (e) {}

  const location = window.location;
  if (/\.(js|mjs|jsx|ts|tsx|c|cpp|cs)$/.test(location.href)) {
    return editorView(data, "typescript");
  }
  if (/\.(css)$/.test(location.href)) {
    return editorView(data, "css");
  }
  if (/\.(text|txt|log)$/.test(location.href)) {
    return editorView(data);
  }
};

initialize();
