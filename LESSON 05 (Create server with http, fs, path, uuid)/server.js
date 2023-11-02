const http = require('http');
const path = require('path');
const fs = require('fs').promises;
const logEvents = require('./logEvents');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter { }; // taken directly from the docs
const PORT = process.env.PORT || 4000;

const myEmitter = new MyEmitter();
myEmitter.on('log', (msg, filename) => {
  console.log(msg);
  console.log(filename);
  logEvents(msg, filename);
});
// Function to serve a file
const serveFile = async (filepath, contentType, response) => {
  try {
    const data = await fs.readFile(filepath);
    response.writeHead(200, { 'Content-Type': contentType });
    response.end(data);
  } catch (err) {
    console.error(err);
    myEmitter.emit('log', `${err.name}\t${err.message}`, "errLog.txt");
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer(async (req, res) => {
  // let { url } = req;
  console.log(req.url, req.method);
  myEmitter.emit('log', `${req.method}\t${req.url}`, "reqLog.txt");


  const extension = path.extname(req.url);
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


    // Determine the file path based on content type and URL
    let filepath = contentType === 'text/html' && req.url === '/'
        ? path.join(__dirname, 'views', 'index.html')
        : contentType === 'text/html' && req.url.slice(-1) === '/'
            ? path.join(__dirname, 'views', req.url, 'index.html')
            : path.join(__dirname, req.url);
    // let filepath =
    //   req.url === '/' || req.url.slice(-1) === '/'
    //     ? path.join(__dirname, 'views', req.url, 'index.html')
    //     : path.join(__dirname, req.url);
 
          // Add .html extension if necessary
        if(!extension && req.url.slice(-1) !== '/') filepath += '.html'
        
        if (filepath.endsWith('old-page.html')) {             // Redirect to new-page.html if old-page.html is requested
          res.writeHead(301, { 'Location': '/views/new-page.html' });
          res.end();
        } else if (filepath.endsWith('www-page.html')) {       // Redirect to root if www-page.html is requested
            res.writeHead(301, { 'Location': '/' });
            res.end();
        } else {          // Serve the requested file or show 404 page if not found
            try { 
              await fs.access(filepath);  //checking if a file or directory exists at the specified  filepath, else error is thrown
              serveFile(filepath, contentType, res);
            } catch (err) {
              console.log(filepath);
              myEmitter.emit('log', `${err.name}\t${err.message}`, "errLog.txt");
              serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
            }
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const url = "http://localhost:4000/views/subdir/";
// const parsedUrl = new URL(url);
// const paths = parsedUrl.pathname.split("/");
// const lastPath = paths[paths.length - 2];

// console.log(lastPath);