const CreateUserUseCase = require("./createUserUseCase");

const createUserUseCase = new CreateUserUseCase();

class CreateUserController {
  async handle(request, response) {
    request.on("data", async (data) => {
      let user;
      const body = JSON.parse(data);
      try {
        user = await createUserUseCase.execute(body);
      } catch (err) {
        response.statusCode = 400;
        response.end(
          JSON.stringify({
            message: err.message,
          })
        );
      }

      response.statusCode = 201;
      return response.end(JSON.stringify(user));
    });
  }
}

module.exports = CreateUserController;
