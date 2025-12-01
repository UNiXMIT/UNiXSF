import fs from 'fs'
import path from 'path';

const manifestPath = path.join("SFExtFF", "manifest.json");
if (!fs.existsSync(manifestPath)) {
    console.error("manifest.json not found:", manifestPath);
    process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const version = manifest.version;

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const ffDir = path.join("updates", "FF", version);
const chromiumDir = path.join("updates", "Chromium", version);
ensureDir(ffDir);
ensureDir(chromiumDir);