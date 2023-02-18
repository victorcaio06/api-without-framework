const http = require("http");

require("./infra/postgres/database");

const user = require("./modules/user/user");

const port = 4444;

const server = http.createServer((request, response) => {
  const METHOD = request.method;
  const URL = request.url;

  if (URL.startsWith("/users")) {
    if (METHOD === "POST") {
      request.on("data", (data) => {
        const body = JSON.parse(data);

        const result = user.create(body);

        response.statusCode = 201;
        return response.end(JSON.stringify(result));
      });
    }

    if (METHOD === "GET") {
      const users = user.list();
      return response.end(JSON.stringify(users));
    }

    if (METHOD === "PUT") {
      const paramsSplit = URL.split("/");
      const id = paramsSplit[2];

      request
        .on("data", (data) => {
          const body = JSON.parse(data);

          user.update(id, body);
        })
        .on("end", () => {
          response.statusCode = 204;
          return response.end();
        });
    }
  }
});

server.listen(port, () => console.log("Server is running!!"));

process.on("uncaughtException", (error) => console.log("Error: ", error));
