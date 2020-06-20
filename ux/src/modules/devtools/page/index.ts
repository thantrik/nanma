const initialize = () => {
  chrome.devtools.inspectedWindow.eval(
    "inspect($$('head script[data-soak=main]')[0])",
    function (result, isException) {}
  );
};

initialize();

export { initialize };
