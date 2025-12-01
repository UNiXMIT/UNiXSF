#!/usr/bin/env node

const fs = require('fs');
const path = require("path");

const manifest = require(path.join("SFExtFF", "manifest.json"));
if (!fs.existsSync(path.join("SFExtFF", "manifest.json"))) {
    console.error("manifest.json not found:", manifest);
    process.exit(1);
}
const version = manifest.version;

const oldZipName = `SFExt.zip`;
const newZipName = `SFExt-${version}.zip`;
if (fs.existsSync(oldZipName)) {
    fs.renameSync(oldZipName, path.join(chromiumDir, newZipName));
} else {
    console.error("Build zip not found:", zipName);
    process.exit(1);
}

console.log("\nBuild complete.");