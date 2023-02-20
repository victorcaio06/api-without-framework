const http = require("http");
const CreateUserController = require("./modules/user/useCases/createUser/createUserController");
const ListUserController = require("./modules/user/useCases/listUser/listUsercontroller");

const user = require("./modules/user/user");

require("./infra/postgres/database");

const createUserController = new CreateUserController();
const listUserController = new ListUserController();

const port = 4444;

const server = http.createServer(async (request, response) => {
  const METHOD = request.method;
  const URL = request.url;

  if (URL.startsWith("/users")) {
    if (METHOD === "POST") {
      await createUserController.handle(request, response);
    }

    if (METHOD === "GET") {
      const users = await listUserController.handle();
      
      return response.end(JSON.stringify(users));
    }

    if (METHOD === "PUT") {
      const paramsSplit = URL.split("/");
      const id = paramsSplit[2];

      request.on("data", async (data) => {
        const body = JSON.parse(data);

        try {
          await user.update(id, body);

          response.statusCode = 204;
          return response.end();
        } catch (err) {
          response.statusCode = 404;
          return response.end(
            JSON.stringify({
              message: err.message,
            })
          );
        }
      });
    }
  }
});

server.listen(port, () => console.log("Server is running!!"));

process.on("uncaughtException", (error) => console.log("Error: ", error));
