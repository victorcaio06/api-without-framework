const http = require("http");
const { randomUUID } = require("crypto");

const port = 4444;

let users = [];

const server = http.createServer((request, response) => {
  const METHOD = request.method;

  if (METHOD === "POST") {
    request.on("data", (data) => {
      const body = JSON.parse(data);

      const userSave = {
        ...body,
        id: randomUUID(),
      };

      users.push(userSave);

      return response.end(JSON.stringify(userSave));
    });
  }
});

server.listen(port, () => console.log("Server is running!!"));
