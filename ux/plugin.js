const path = require("path");
const fs = require("fs");
const replace = require("replace-in-file");
const camelCase = require("camelcase");
var rimraf = require("rimraf");

const createTemplate = (pluginName) => {
  pluginName = pluginName.toLowerCase();
  const pluginTemplatePath = path.join(__dirname, "/src/plugins/json");
  const newPluginPath = path.join(__dirname, "/src/plugins/" + pluginName);
  const newName = (file) => {
    return file.replace(/json/g, pluginName);
  };
  fs.readdir(pluginTemplatePath, function (err, files) {
    if (err) {
      return console.error("Unable to scan directory: " + err);
    }
    if (!fs.existsSync(newPluginPath)) fs.mkdirSync(newPluginPath);
    const TypeName = camelCase(`${pluginName}Type`, { pascalCase: true });
    const VarName = camelCase(`${pluginName}`, { pascalCase: true });
    const varName = camelCase(pluginName);
    const replaceOptions = {
      files: [],
      from: [
        / ".\/json/gi,
        /Json/g,
        /JSON/g,
        /\"\/json\"/i,
        /JsonType/g,
        /name: "json",/gi,
        /json-/,
        /json/g,
      ],
      to: [
        `"./${pluginName}`,
        VarName,
        VarName.toUpperCase(),
        ` "/${pluginName}"`,
        TypeName,
        `name: "${pluginName.toLowerCase()}",`,
        `${varName.toLowerCase()}-`,
        varName,
      ],
    };
    files.forEach(function (file) {
      const newPath = path.join(newPluginPath, newName(file));
      fs.copyFileSync(path.join(pluginTemplatePath, file), newPath);
      replaceOptions.files.push(newPath);
      console.log("Copied: ", path.join(newPluginPath, newName(file)));
    });

    replace(replaceOptions)
      .then((changedFiles) => {
        changedFiles.forEach(
          (ch) => ch.hasChanged && console.log("Modified: ", ch.file)
        );
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  });
};

process.argv.slice(2).forEach(createTemplate);
