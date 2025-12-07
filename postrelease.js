import fs from 'fs'
import path from 'path';

const packagePath = path.join("package.json");
if (!fs.existsSync(packagePath)) {
    console.error("package.json not found:", packagePath);
    process.exit(1);
}

const version = JSON.parse(fs.readFileSync(packagePath, "utf8")).version;

function prependLargeFileAndLine(line, sourcePath, targetPath) {
    const tempPath = targetPath + '.tmp';
    const output = fs.createWriteStream(tempPath);
    output.write(line + '\n\n');
    const sourceStream = fs.createReadStream(sourcePath);
    sourceStream.pipe(output, { end: false });
    sourceStream.on('end', () => {
        output.write('\n\n');
        const targetStream = fs.createReadStream(targetPath);
        targetStream.pipe(output);
        targetStream.on('end', () => {
            output.end();
            fs.rename(tempPath, targetPath, (err) => {
                if (err) throw err;
            });
        });
    });
}

prependLargeFileAndLine(
    `# ${version}`,
    'LATEST.md',
    'CHANGELOG.md'
);

fs.truncate('example.txt', 0, (err) => {
  if (err) throw err;
});