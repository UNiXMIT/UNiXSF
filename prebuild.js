#!/usr/bin/env node

import fs from 'fs'
import path from 'path';

const manifest = require(path.join("SFExtFF", "manifest.json"));
if (!fs.existsSync(path.join("SFExtFF", "manifest.json"))) {
    console.error("manifest.json not found:", manifest);
    process.exit(1);
}
const version = manifest.version;

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const ffDir = path.join("updates", "FF", version);
const chromiumDir = path.join("updates", "Chromium", version);
ensureDir(ffDir);
ensureDir(chromiumDir);