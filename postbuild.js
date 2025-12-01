import fs from 'fs'
import path from 'path';

const manifestPath = path.join("SFExtFF", "manifest.json");
if (!fs.existsSync(manifestPath)) {
    console.error("manifest.json not found:", manifestPath);
    process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const version = manifest.version;

const chromiumDir = path.join("updates", "Chromium", version);
const oldZipName = `SFExt.zip`;
const newZipName = `SFExt-${version}.zip`;
if (fs.existsSync(oldZipName)) {
    fs.renameSync(oldZipName, path.join(chromiumDir, newZipName));
} else {
    console.error("Build zip not found:", zipName);
    process.exit(1);
}

console.log("\nBuild complete.");