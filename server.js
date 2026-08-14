const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// API endpoint to return all project source files for ZIP backup & repo download
app.get('/api/source-files', (req, res) => {
  const ignoredDirs = ['.git', 'node_modules', '.vscode', '.idea'];
  const ignoredFilePrefixes = ['.env', '.git', '.DS_Store'];
  const ignoredFiles = ['bun.lock', 'package-lock.json', 'firebase-applet-config.json'];
  const ignoredExtensions = ['.pem', '.key', '.p12', '.crt', '.sqlite', '.db', '.zip', '.mp4', '.png', '.jpg', '.jpeg', '.gif', '.ico'];

  function isSensitiveOrIgnored(file) {
    if (ignoredFiles.includes(file)) return true;
    if (ignoredFilePrefixes.some((prefix) => file.startsWith(prefix))) return true;
    if (ignoredExtensions.some((ext) => file.toLowerCase().endsWith(ext))) return true;
    return false;
  }

  function getFiles(dir, base = '') {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const relPath = base ? path.join(base, file) : file;
      const stat = fs.statSync(filePath);

      if (stat && stat.isDirectory()) {
        if (!ignoredDirs.includes(file) && !file.startsWith('.')) {
          results = results.concat(getFiles(filePath, relPath));
        }
      } else {
        if (!isSensitiveOrIgnored(file)) {
          let mime = 'text/plain';
          if (file.endsWith('.html')) mime = 'text/html';
          else if (file.endsWith('.css')) mime = 'text/css';
          else if (file.endsWith('.js')) mime = 'text/javascript';
          else if (file.endsWith('.json')) mime = 'application/json';
          else if (file.endsWith('.md')) mime = 'text/markdown';
          else if (file.endsWith('.xml')) mime = 'text/xml';

          try {
            const content = fs.readFileSync(filePath, 'utf8');
            results.push({ path: relPath.replace(/\\/g, '/'), content, mime });
          } catch (e) {
            console.error('Error reading file:', filePath, e);
          }
        }
      }
    });
    return results;
  }

  try {
    const files = getFiles(__dirname);
    res.json({ success: true, count: files.length, files });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Serve static files safely, ignoring dotfiles like .env
app.use(express.static(__dirname, { dotfiles: 'ignore' }));

// Fallback to index.html for SPA routing
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`EduCode Studio running on http://0.0.0.0:${PORT}`);
});

