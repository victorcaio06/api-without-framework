const UpdateUserUseCase = require("./updateUserUseCase");

class UpdateUserController {
  updateUserUseCase = new UpdateUserUseCase();

  async handle(request, response) {
    const URL = request.url;
    const paramsSplit = URL.split("/");
    const id = paramsSplit[2];

    request.on("data", async (data) => {
      const body = JSON.parse(data);

      try {
        await this.updateUserUseCase.execute(id, body);

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
