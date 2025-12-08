import fs from 'fs'
import path from 'path';

const packagePath = path.join("package.json");
if (!fs.existsSync(packagePath)) {
    console.error("package.json not found:", packagePath);
    process.exit(1);
}

const version = JSON.parse(fs.readFileSync(packagePath, "utf8")).version;

function prependFile(sourcePath, targetPath) {
  try {
    const sourceContent = fs.readFileSync(sourcePath, "utf8");
    const targetContent = fs.readFileSync(targetPath, "utf8");
    const tempPath = targetPath + '.tmp';

    fs.appendFileSync(tempPath, '# ' + version + '\n\n', "utf8");
    fs.appendFileSync(tempPath, sourceContent, "utf8");
    fs.appendFileSync(tempPath, '\n\n', "utf8");
    fs.appendFileSync(tempPath, targetContent, "utf8");
    fs.unlinkSync(targetPath);
    fs.renameSync(tempPath, targetPath);
    fs.truncateSync('LATEST.md', 0)

  } catch (err) {
    console.error('Error:', err);
  }
}

prependFile('LATEST.md', 'CHANGELOG.md');