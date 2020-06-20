const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");

function getConfig(isEnvProduction) {
  return isEnvProduction
    ? {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }
    : undefined;
}

const CreateHtmlWebpackPlugin = (config = {}, isEnvProduction = false) =>
  new HtmlWebpackPlugin(
    Object.assign(
      config,
      {
        inject: true,
      },
      getConfig(isEnvProduction)
    )
  );

const getHtmlPlugins = (isEnvProduction) => [
  CreateHtmlWebpackPlugin({
    template: paths.appHtml,
    chunks: ["app"],
  }),
  CreateHtmlWebpackPlugin({
    template: paths.popupHtml,
    filename: "popup.html",
    chunks: ["popup"],
  }),
  CreateHtmlWebpackPlugin({
    template: paths.devToolHtml,
    chunks: ["devTools"],
    filename: "devtools.html",
  }),
  CreateHtmlWebpackPlugin({
    template: paths.devToolPageHtml,
    chunks: ["devToolsPage"],
    filename: "devtools_page.html",
  }),
  CreateHtmlWebpackPlugin({
    template: paths.settingsHtml,
    chunks: ["settings"],
    filename: "settings.html",
  }),
];

module.exports = getHtmlPlugins;
