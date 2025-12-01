#!/usr/bin/env node

const fs = require('fs');
const path = require("path");

const manifest = require(path.join("SFExtFF", "manifest.json"));
const version = manifest.version;

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const ffDir = path.join("updates", "FF", version);
const chromiumDir = path.join("updates", "Chromium", version);
ensureDir(ffDir);
ensureDir(chromiumDir);