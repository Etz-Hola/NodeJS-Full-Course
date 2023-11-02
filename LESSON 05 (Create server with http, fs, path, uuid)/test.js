
javascript
const http = require('http');
const path = require('path');
const fs = require('fs').promises;

const PORT = process.env.PORT || 3000;

const serveFile = async (filepath, contentType, response) => {
  try {
    const data = await fs.readFile(filepath);
    response.writeHead(200, { 'Content-Type': contentType });
    response.end(data);
  } catch (err) {
    console.error(err);
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer(async (request, response) => {
  const { url } = request;
  console.log(url, request.method);

  const extension = path.extname(url);
  let contentType;

  switch (extension) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.txt':
      contentType = 'text/plain';
      break;
    default:
      contentType = 'text/html';
  }

  if (url.endsWith('old-page.html')) {
    response.writeHead(301, { 'Location': '/new-page.html' });
    response.end();
  } else if (url.endsWith('www-page.html')) {
    response.writeHead(301, { 'Location': '/' });
    response.end();
  } else {
    let filepath =
      url === '/' || !path.extname(url)
        ? path.join(__dirname, 'views', url, 'index.html')
        : path.join(__dirname, 'views', url);

    try {
      await fs.access(filepath);
      serveFile(filepath, contentType, response);
    } catch (err) {
      serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', response);
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


