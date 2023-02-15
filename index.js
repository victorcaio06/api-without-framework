const http = require('http');

const port = 4444;

const server = http.createServer((request, response) => {});

server.listen(port, () => console.log('Server is running!!'));