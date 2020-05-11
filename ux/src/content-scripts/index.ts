// window.setCodeView;
// window.setJSONView;

// const jsonView = () => window.setJSONView && window.setJSONView();

// const setUpApp = (data, type, route) => {
//   window.initializeView && window.initializeView(data, type);
//   route && window.push && window.push(route);
// };

// const initialize = () => {
//   if (document?.doctype?.name === "html") return;
//   const data = String(document.body.innerText).trim();
//   if (!data) {
//     return;
//   }
//   try {
//     window.___DATA = JSON.parse(data);
//     window.setCodeView(null, "json", "/json");
//     return;
//   } catch (e) {}
//   try {
//     const pos = data.indexOf("\n");
//     if (pos !== -1) {
//       const firstLine = data.substr(0, pos) || "";
//       if (
//         firstLine &&
//         (firstLine.trim().indexOf("{") !== -1 ||
//           firstLine.trim().indexOf("[") !== -1)
//       ) {
//         window.___DATA = data;
//         editorView(null, "json", "/json");
//         return;
//       }
//     }
//   } catch (e) {}

//   const location = window.location;
//   if (/\.(js|mjs|jsx|ts|tsx|c|cpp|cs)$/.test(location.href)) {
//     window.push && window.push("/code");
//     return editorView(data, "typescript", "/code");
//   }
//   if (/\.(css)$/.test(location.href)) {
//     window.push && window.push();
//     return editorView(data, "css", "/code");
//   }
//   if (/\.(text|txt|log)$/.test(location.href)) {
//     return editorView(data, null, "/code");
//   }
//   if (/\.md$/i.test(location.href)) {
//     return editorView(data, null, "/md-editor");
//   }
// };

export const initialize = () => {
  console.log("STARTED");
};

initialize();
