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

        response.statusCode = 201;
        return response.end(JSON.stringify(userSave));
      });
    }

    if (METHOD === "GET") {
      return response.end(JSON.stringify(users));
    }

    if (METHOD === "PUT") {
      const paramsSplit = URL.split("/");
      const id = paramsSplit[2];

      const userIndex = users.findIndex((user) => user.id === id);

      if (userIndex < 0) {
        response.statusCode = 400;
        return response.end({message: 'User not found!'});
      }

      request
        .on("data", (data) => {
          const body = JSON.parse(data);

          users[userIndex] = {
            name: body.name ? body.name : users[userIndex].name,
            username: body.username ? body.username : users[userIndex].username,
            email: body.email ? body.email : users[userIndex].email,
            id,
          };
        })
        .on("end", () => {
          return response.end();
        });
    }
  }
});

server.listen(port, () => console.log("Server is running!!"));
