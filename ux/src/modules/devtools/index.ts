const initDevTools = () => {
  chrome.devtools.panels.create(
    "WebTool",
    "icons/icon.svg",
    "devtools_page.html",
    function (panel) {
      console.log("Panel created", panel);
    }
  );

  chrome.devtools.panels.elements.createSidebarPane("WebBar", function (
    sidebar
  ) {
    sidebar.setObject({ some_data: "Some data to show" });
  });
};

initDevTools();

export { initDevTools };
