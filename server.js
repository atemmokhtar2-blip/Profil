const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function safePath(urlPath) {
  const pathname = decodeURIComponent(urlPath.split('?')[0]);
  const requested = pathname === '/' ? '/index.html' : pathname;
  const resolved = path.resolve(root, `.${requested}`);
  return resolved.startsWith(root) ? resolved : null;
}

const server = http.createServer((req, res) => {
  const requested = safePath(req.url || '/');
  let file = requested;
  if (!file || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    if ((req.url || '/').startsWith('/contact')) file = path.join(root, 'contact.html');
    else file = path.join(root, 'index.html');
  }
  fs.readFile(file, (error, data) => {
    if (error) {
      res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('Internal server error');
      return;
    }
    res.writeHead(200, { 'content-type': mime[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-cache' });
    res.end(data);
  });
});

server.listen(port, '0.0.0.0', () => console.log(`HATEM site listening on ${port}`));
