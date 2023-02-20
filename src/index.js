const http = require("http");
const CreateUserController = require("./modules/user/useCases/createUser/createUserController");
const ListUserController = require("./modules/user/useCases/listUser/listUsercontroller");
const UpdateUserController = require("./modules/user/useCases/updateUser/updateUserController");

const user = require("./modules/user/user");

require("./infra/postgres/database");

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const updateUserController = new UpdateUserController();

const port = 4444;

const server = http.createServer(async (request, response) => {
  const METHOD = request.method;
  const URL = request.url;

  if (URL.startsWith("/users")) {
    if (METHOD === "POST") {
      await createUserController.handle(request, response);
    }

    if (METHOD === "GET") {
      await listUserController.handle(request, response);
    }

    if (METHOD === "PUT") {
      await updateUserController.handle(request, response);
    }
  }
});

server.listen(port, () => console.log("Server is running!!"));

process.on("uncaughtException", (error) => console.log("Error: ", error));
