import fs from 'fs'
import path from 'path';

const packagePath = path.join("package.json");
if (!fs.existsSync(packagePath)) {
    console.error("package.json not found:", packagePath);
    process.exit(1);
}

const version = JSON.parse(fs.readFileSync(packagePath, "utf8")).version;

const ffDir = path.join("updates", "FF", version);
const chromiumDir = path.join("updates", "Chromium", version);
if (!fs.existsSync(ffDir)) fs.mkdirSync(ffDir, { recursive: true });
if (!fs.existsSync(chromiumDir)) fs.mkdirSync(chromiumDir, { recursive: true });

const oldZipName = `SFExt.zip`;
const newZipName = `SFExt-${version}.zip`;
if (fs.existsSync(oldZipName)) {
    fs.renameSync(oldZipName, path.join(chromiumDir, newZipName));
} else {
    console.error("Build zip not found:", zipName);
    process.exit(1);
}

const chromiumVerPath = path.join("updates", "Chromium", "latestVersion.json");
const chromiumVer = JSON.parse(fs.readFileSync(chromiumVerPath, 'utf8'));
chromiumVer.latestVersion = version;
fs.writeFileSync(chromiumVerPath, JSON.stringify(chromiumVer, null, 2));

const ffVerPath = path.join("updates", "FF", "updates.json");
const ffVer = JSON.parse(fs.readFileSync(ffVerPath, 'utf8'));
const FFID = "{23d40d0a-b0f9-4516-8c5c-ac5951d517b5}";
const updateURL = `https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/updates/FF/${version}/1aa420af9a0c4d9d8e9d-${version}.xpi`;
const newEntry = {
    version: version,
    update_link: updateURL
};
ffVer.addons[FFID].updates.push(newEntry);
fs.writeFileSync(ffVerPath, JSON.stringify(ffVer, null, 2));

console.log(`\nBuild complete. Version ${version} is ready for signing.\n`);