const UpdateUserUseCase = require("./updateUserUseCase");

const updateUserUseCase = new UpdateUserUseCase();

class UpdateUserController {
  async handle(request, response) {
    const { id } = request.params;

    request.on("data", async (data) => {
      const body = JSON.parse(data);

      try {
        await updateUserUseCase.execute(id, body);

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

module.exports = UpdateUserController;
