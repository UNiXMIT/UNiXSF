import fs from 'fs'
import path from 'path';
import { exec } from "child_process";

const packagePath = path.join("package.json");
if (!fs.existsSync(packagePath)) {
    console.error("package.json not found:", packagePath);
    process.exit(1);
}

const version = JSON.parse(fs.readFileSync(packagePath, "utf8")).version;

function run(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(err);
      console.log(stdout);
      console.error(stderr);
      resolve();
    });
  });
}

const gitCommands = [
  "git add .",
  `git commit -m ${version}`,
  "git push"
];
for (const cmd of gitCommands) {
  console.log(cmd);
  await run(cmd);
}