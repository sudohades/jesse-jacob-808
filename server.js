const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Read vercel.json for rewrites
const versionConfig = JSON.parse(fs.readFileSync('./vercel.json', 'utf8'));
const rewrites = versionConfig.rewrites || [];

const PORT = 3000;
const BASE_DIR = __dirname;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // Check if pathname matches any rewrite rules
  let destination = pathname;
  for (const rewrite of rewrites) {
    const source = rewrite.source;
    if (pathname === source || pathname === source + '/') {
      destination = rewrite.destination;
      break;
    }
  }

  // Remove leading slash and resolve file path
  let filePath = path.join(BASE_DIR, destination.replace(/^\//, ''));

  // Try to serve the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If file not found, try index.html for non-existent routes
      const indexPath = path.join(BASE_DIR, 'index.html');
      fs.readFile(indexPath, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
      return;
    }

    // Determine content type
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'text/plain';
    const contentTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon'
    };
    contentType = contentTypes[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`
🚀 Development server running at http://localhost:${PORT}
📁 Serving files from: ${BASE_DIR}
✅ Rewrites from vercel.json are active
🔄 Routes: /welcome, /whoIam, /whatCanIdo, /whatIveDone
  `);
});
