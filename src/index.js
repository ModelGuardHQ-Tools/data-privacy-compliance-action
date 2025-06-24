#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Walk directory recursively
function walk(dir, filelist = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.git' || entry.name === 'node_modules') continue;
      walk(full, filelist);
    } else {
      filelist.push(full);
    }
  }
  return filelist;
}

function filterFiles(files) {
  return files.filter(f => {
    const base = path.basename(f).toLowerCase();
    return true; // scan everything by default; you can refine later
  });
}

(function main() {
  try {
    const cwd = process.cwd();
    const allFiles = walk(cwd);
    const filesToScan = filterFiles(allFiles);

    const patterns = JSON.parse(fs.readFileSync(
      path.join(cwd, 'data', 'patterns.json'), 'utf8'
    ));

    const violations = [];

    for (const [name, regexStr] of Object.entries(patterns)) {
      const re = new RegExp(regexStr, 'g');
      for (const file of filesToScan) {
        const content = fs.readFileSync(file, 'utf8');
        if (re.test(content)) {
          violations.push({ pattern: name, file });
        }
      }
    }

    if (violations.length) {
      console.error('Violations found:', JSON.stringify(violations, null, 2));
      process.exit(1);
    } else {
      console.log('No data-privacy violations detected.');
      process.exit(0);
    }
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
})();
