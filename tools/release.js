const chalk = require("chalk");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const args = require("args");

args.option(
  "bump",
  "release version bump [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]",
  "patch"
);

let error, stdout, stderr;
const log = (...args) => console.log(chalk.green(...args)),
  logError = (...args) => console.log(chalk.red(...args)),
  logFailure = (...args) => console.log(chalk.bold.red(...args)),
  logCmd = (...args) => console.log("⇰", chalk.bold.yellowBright(...args));

const flags = args.parse(process.argv);

const cmd = async (strCmd) => {
  if (error) {
    console.info(`Skip: ${strCmd}`);
    return;
  }

  try {
    logCmd(strCmd);
    ({ error, stdout, stderr } = await exec(strCmd));
    stdout && log(stdout);
    stderr && logError(stderr);
  } catch (e) {
    error = e;
    logFailure("ERROR", e);
  }
};

(async () => {
  /**
   * npm version bump
   * yarn build
   * create release tar
   * commit release tar
   * tag release
   * push tags, release package
   * copy release to github.io repo
   * commit github io repo
   */
  //await cmd(`yarn build:${flags.bump}`);
  const { name, version } = require("../package.json");
  await cmd(`tar -czf releases/${version}.tar.gz ${version}`);
  await cmd(`git add . && git commit -m "Release ${version}"`);
  await cmd(`git tag -a v${version} -m "Release ${version}"`);
  await cmd(`git push origin --tags`);
})();
