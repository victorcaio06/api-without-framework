const DeleteUserUseCase = require("./deleteUserUseCase");

const deleteUserUseCase = new DeleteUserUseCase();

class DeleteUserController {
  async handle(request, response) {
    const { id } = request.params;

    try {
      await deleteUserUseCase.execute(id);

      response.statusCode = 204;
      response.end();
    } catch (err) {
      response.statusCode = 404;
      response.end(
        JSON.stringify({
          message: err.message,
        })
      );
    }
  }
}

module.exports = DeleteUserController;
