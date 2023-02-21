const CreateUserUseCase = require("./createUserUseCase");

const createUserUseCase = new CreateUserUseCase();

class CreateUserController {
  async handle(request, response) {
    const body = request.body;

    try {
      const user = await createUserUseCase.execute(body);

      response.statusCode = 201;
      return response.end(JSON.stringify(user));
    } catch (err) {
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: err.message,
        })
      );
    }
  }
}

module.exports = CreateUserController;
