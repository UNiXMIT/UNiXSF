import fs from 'fs'
import path from 'path';

const packagePath = path.join("package.json");
if (!fs.existsSync(packagePath)) {
    console.error("package.json not found:", packagePath);
    process.exit(1);
}

const version = JSON.parse(fs.readFileSync(packagePath, "utf8")).version;

const ffDir = path.join("updates", "FF", version);
const xpiName = `1aa420af9a0c4d9d8e9d-${version}.xpi`;
if (fs.existsSync(xpiName)) {
    fs.renameSync(xpiName, path.join(ffDir, xpiName));
} else {
    console.error("Signed xpi not found:", xpiName);
    process.exit(1);
}

console.log(`\nSigning complete. Version ${version} is ready for release.\n`);