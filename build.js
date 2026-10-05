const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const publicDir = path.join(root, 'public');
const contactDir = path.join(publicDir, 'contact');

fs.mkdirSync(contactDir, { recursive: true });

const copies = [
  ['index.html', path.join(publicDir, 'index.html')],
  ['contact.html', path.join(publicDir, 'contact.html')],
  ['contact.html', path.join(contactDir, 'index.html')],
  ['styles.css', path.join(publicDir, 'styles.css')],
  ['script.js', path.join(publicDir, 'script.js')],
  ['_redirects', path.join(publicDir, '_redirects')],
];

for (const [source, destination] of copies) {
  const sourcePath = path.join(root, source);
  if (fs.existsSync(sourcePath)) fs.copyFileSync(sourcePath, destination);
}

console.log(`Cloudflare assets prepared in ${path.relative(root, publicDir)}/`);
