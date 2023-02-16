const http = require("http");
const { randomUUID } = require("crypto");

const port = 4444;

let users = [];

const server = http.createServer((request, response) => {
  const METHOD = request.method;
  const URL = request.url;

  if (URL.startsWith("/users")) {
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

    if (METHOD === "GET") {
      return response.end(JSON.stringify(users));
    }

    if (METHOD === "PUT") {
      const paramsSplit = URL.split("/");
      const user = users.find((user) => user.id === paramsSplit[2]);

      return response.end(JSON.stringify(user));
    }
  }
});

server.listen(port, () => console.log("Server is running!!"));
