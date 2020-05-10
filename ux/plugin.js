const path = require("path");
const fs = require("fs");

const createTemplate = (pluginName) => {
  const pluginTemplatePath = path.join(__dirname, "/src/plugins/json");
  const newPluginPath = path.join(__dirname, "/src/plugins/" + pluginName);
  const newName = (file) => {
    return file.replace(/json/g, pluginName);
  };
  fs.readdir(pluginTemplatePath, function (err, files) {
    if (err) {
      return console.error("Unable to scan directory: " + err);
    }
    fs.mkdirSync(newPluginPath);
    files.forEach(function (file) {
      fs.copyFileSync(
        path.join(pluginTemplatePath, file),
        path.join(newPluginPath, newName(file))
      );
      console.log(file, path.join(newPluginPath, newName(file)));
    });
  });
};

process.argv.slice(2).forEach(createTemplate);
