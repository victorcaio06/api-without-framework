const ListUserUseCase = require("./listUserUseCase");

const listUserUseCase = new ListUserUseCase();

class ListUserController {
  async handle(request, response) {
    const users = await listUserUseCase.execute();

    return response.end(JSON.stringify(users));
  }
}

module.exports = ListUserController;
