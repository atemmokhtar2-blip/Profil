const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const publicRoot = path.join(root, 'public');
const port = Number(process.env.PORT || 3000);
const mime = { '.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon' };
function resolvePath(urlPath){ const pathname=decodeURIComponent(urlPath.split('?')[0]); const file=pathname==='/'?'/index.html':pathname; const base=pathname.startsWith('/assets/')||pathname==='/manus-routes.json'?publicRoot:root; const resolved=path.resolve(base,`.${file}`); return resolved.startsWith(base)?resolved:null; }
const server=http.createServer((req,res)=>{ let file=resolvePath(req.url||'/'); if(!file||!fs.existsSync(file)||fs.statSync(file).isDirectory()){ file=(req.url||'').startsWith('/contact')?path.join(root,'contact.html'):path.join(root,'index.html'); } fs.readFile(file,(err,data)=>{ if(err){res.writeHead(500,{'content-type':'text/plain; charset=utf-8'});res.end('Internal server error');return;} res.writeHead(200,{'content-type':mime[path.extname(file)]||'application/octet-stream','cache-control':'no-cache'});res.end(data); }); });
server.listen(port,'0.0.0.0',()=>console.log(`HATEM site listening on ${port}`));
