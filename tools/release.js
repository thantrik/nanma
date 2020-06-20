const chalk = require("chalk");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const args = require("args");
const { cwd } = require("process");
const path = require("path");
const FileSystem = require("pwd-fs");
const fs = require("fs");

const pfs = new FileSystem();

args.option(
  "bump",
  "release version bump [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]",
  "patch"
);

args.option("publish", "Publish to npm repo", false);

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
  try {
    await cmd(
      `npm version ${flags.bump} && cd ux && npm version ${flags.bump} && yarn build`
    );
    const { name, version } = require("../package.json");
    const APP_NAME = name;
    const GITHUB_IO_BASE = "../thantrik.github.io";
    const GITHUB_IO_NAME = `${GITHUB_IO_BASE}/${APP_NAME}`;
    const WORKING_DIR = cwd();
    // await cmd(`tar -czf releases/${version}.tar.gz ${version}`);
    await cmd(
      `git add releases ux package.json && git commit -m "Release ${version}"`
    );
    // await cmd(`chrome.exe"--pack-extension=${path.resolve(__dirname, version)}`);
    await cmd(
      `git tag -a v${version} -m "Release ${version}" && git push origin --tags`
    );

    //if (flags.publish)
    // await cmd(
    //   `npm publish --registry="https://registry.npmjs.org" --scope="@thantrik" --access public`
    // );
    await cmd(`npm publish`);
    if (fs.existsSync(GITHUB_IO_NAME)) {
      await pfs.remove(GITHUB_IO_NAME);
    }
    await pfs.copy(`${version}`, GITHUB_IO_BASE);
    await pfs.rename(`../thantrik.github.io/${version}`, GITHUB_IO_NAME);
    await cmd(`cd ${GITHUB_IO_BASE} && git add ${APP_NAME}`);
    process.chdir(path.resolve(GITHUB_IO_BASE));
    await cmd(`git commit -m "Release ${APP_NAME} ${version}"`);
    await cmd(`git push origin`);
    process.chdir(WORKING_DIR);
    if (flags.publish)
      await cmd(
        `yarn publish --registry="https://registry.npmjs.org" --scope="@thantrik" --access public`
      );
  } catch (e) {
    logFailure("FAILED", e);
  }
})();
