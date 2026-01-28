import fs from 'fs'
import path from 'path';

const packagePath = path.join("package.json");
if (!fs.existsSync(packagePath)) {
    console.error("package.json not found:", packagePath);
    process.exit(1);
}

const version = JSON.parse(fs.readFileSync(packagePath, "utf8")).version;

const chromiumManPath = path.join("SFExt", "manifest.json");
const chromiumManVer = JSON.parse(fs.readFileSync(chromiumManPath, 'utf8'));
chromiumManVer.version = version;
fs.writeFileSync(chromiumManPath, JSON.stringify(chromiumManVer, null, 2));

const FFManPath = path.join("SFExtFF", "manifest.json");
const FFManVer = JSON.parse(fs.readFileSync(FFManPath, 'utf8'));
FFManVer.version = version;
fs.writeFileSync(FFManPath, JSON.stringify(FFManVer, null, 2));