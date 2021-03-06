const fs = require("fs");
const path = require("path");
const paths = require("./paths");

class ExtensionManifestPlugin {
  apply(compiler) {
    compiler.hooks.done.tap("ExtensionManifestPlugin", (stats) => {
      try {
        const manifest = require(paths.appManifest);
        const assetsFile = path.join(paths.appBuild, "/asset-manifest.json");
        if (!fs.existsSync(assetsFile)) return;
        const assets = require(assetsFile);
        const contentScripts = manifest.content_scripts[0];
        // /^(?!.*(sw|service-worker|background|popup|services|devTools)).*js$/i.test(file)
        contentScripts.js = Object.values(assets.files || {}).filter((file) =>
          /^.*(app).*js$/i.test(file)
        );
        contentScripts.css = Object.values(assets.files || {}).filter((file) =>
          /^.*(app).*css$/i.test(file)
        );
        manifest.background.scripts = Object.values(
          assets.files || {}
        ).filter((file) =>
          /^.*([\\/](sw|service-worker|background|services))\.bundle\.js$/i.test(
            file
          )
        );
        manifest.version = paths.package.version;
        const manifestName = paths.appBuild + "/manifest.json";

        fs.writeFileSync(
          manifestName,
          JSON.stringify(manifest, null, 4),
          {
            flag: fs.existsSync(manifestName) ? "w" : "wx",
          },
          (err) => {
            console.log("ERROR", err);
          }
        );
      } catch (e) {
        console.error(e);
      }
    });
  }
}

module.exports = ExtensionManifestPlugin;
