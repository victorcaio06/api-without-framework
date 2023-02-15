const http = require("http");

const port = 4444;

const server = http.createServer((request, response) => {
  if (request.url === "/firstRoute") {
    const result = {
      message: "First response",
    };

    response.statusCode = 200;
    response.setHeader("Content-type", "application/json");
    return response.end(JSON.stringify(result));
  } else if (request.url === "/secondRoute") {
    const result = {
      message: "Second response",
    };

    response.statusCode = 200;
    response.setHeader("Content-type", "application/json");
    return response.end(JSON.stringify(result));
  } 

  response.statusCode = 200;
  response.setHeader("Content-type", "application/json");
  response.write("Homepage");
  response.end();
});

server.listen(port, () => console.log("Server is running!!"));
