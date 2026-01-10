// scripts/scan-secrets-precommit.js
// Blocks commit if likely secrets are present in staged files

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Define suspicious variable patterns (add more as needed)
const SECRET_PATTERNS = [
  /API[_-]?KEY\s*=\s*["'][^"']{16,}["']/i,
  /SECRET\s*=\s*["'][^"']{16,}["']/i,
  /PASSWORD\s*=\s*["'][^"']{8,}["']/i,
  /TURSO_AUTH_TOKEN\s*=\s*["'][^"']{16,}["']/i,
  /PRIVATE[_-]?KEY\s*=\s*["']?-----BEGIN/i,
  /AWS[_-]?SECRET/i,
  /GOOGLE[_-]?API[_-]?KEY/i,
  /GH[_-]?TOKEN/i,
  /DATABASE[_-]?URL\s*=\s*["'][^"'\n]+["']/i,
  /_TOKEN\s*=\s*["'][^"']{16,}["']/i,
];

// Files and dirs to ignore
const IGNORE_PATTERNS = [
  'node_modules/',
  '.env',
  '.env.',
  '.next/',
  'dist/',
  'build/',
  '.husky/',
  '.git/',
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
  '.*.log',
  'coverage/',
  'scripts/scan-secrets-precommit.js'
];

// Helper: check if file should be ignored
function isIgnored(file) {
  return IGNORE_PATTERNS.some(pattern => file.includes(pattern));
}

// Get staged files
let stagedFilesOutput = execSync('git diff --cached --name-only', { encoding: 'utf8' });
let stagedFiles = stagedFilesOutput
  .split('\n')
  .map(f => f.trim())
  .filter(f => f && !isIgnored(f));

// Scan each file for secrets
let hasSecrets = false;
let matches = [];
stagedFiles.forEach(file => {
  let ext = path.extname(file);
  if (['.js', '.ts', '.tsx', '.json', '.env', '.yml', '.yaml', '.md'].includes(ext) || file.includes('config') || file.includes('secret')) {
    try {
      let content = fs.readFileSync(file, 'utf8');
      SECRET_PATTERNS.forEach((regex) => {
        let match = content.match(regex);
        if (match) {
          hasSecrets = true;
          matches.push({ file, snippet: match[0].slice(0, 80) });
        }
      });
    } catch (err) { /* ignore unreadable files */ }
  }
});

if (hasSecrets) {
  console.error('\x1b[31m[ERROR] Commit blocked: Potential secrets detected!\x1b[0m\n');
  matches.forEach(({file, snippet}) =>
    console.error(`File: ${file}\n  Match: ${snippet}\n`)
  );
  console.error('Remove secrets before committing. If false positive, refine the scan rules in scripts/scan-secrets-precommit.js\n');
  process.exit(1);
}

process.exit(0);
