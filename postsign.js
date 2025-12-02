import fs from 'fs'
import path from 'path';

const manifestPath = path.join("SFExtFF", "manifest.json");
if (!fs.existsSync(manifestPath)) {
    console.error("manifest.json not found:", manifestPath);
    process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const version = manifest.version;

const ffDir = path.join("updates", "FF", version);
const xpiName = `1aa420af9a0c4d9d8e9d-${version}.xpi`;
if (fs.existsSync(xpiName)) {
    fs.renameSync(xpiName, path.join(ffDir, xpiName));
} else {
    console.error("Signed xpi not found:", xpiName);
    process.exit(1);
}

console.log(`\nSigning complete. Version ${version} is ready for release.\n`);